import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  setTokenStatusDb,
  createResetTokenDb,
  deleteResetTokenDb,
  isValidTokenDb,
} from "../db/auth.db.js";
import validateUser from "../helpers/validateUser.js";
import { ErrorHandler } from "../helpers/error.js";
import { changeUserPasswordDb } from "../db/user.db.js";
import {
  getUserByEmailDb,
  getUserByUsernameDb,
  createUserDb,
  createUserGoogleDb,
} from "../db/user.db.js";
import { createCartDb } from "../db/cart.db.js";
import {signupMail,resetPasswordMail,forgotPasswordMail} from "./mail.service.js"
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import moment from "moment";
import { logger } from "../utils/logger.js";
const mail = {signupMail,resetPasswordMail,forgotPasswordMail}

let curDate = moment().format();

class AuthService {
  async signUp(user) {
    try {
      const { password, email, username } = user;
      if (!email || !password || !username) {
        throw new ErrorHandler(401, "all fields required");
      }

      if (validateUser(email, password)) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const userByEmail = await getUserByEmailDb(email);
        const userByUsername = await getUserByUsernameDb(username);

        if (userByEmail) {
          throw new ErrorHandler(401, "email taken already");
        }

        if (userByUsername) {
          throw new ErrorHandler(401, "username taken already");
        }

        const newUser = await createUserDb({
          ...user,
          password: hashedPassword,
        });

        const { cart_id: cart_id } = await createCartDb(newUser.user_id);
        const token = await this.signToken({
          user_id: newUser.user_id,
          is_admin: newUser.is_admin,
          cart_id:cart_id,
        });
        const refreshToken = await this.signRefreshToken({
          user_id: newUser.user_id,
          is_admin: newUser.is_admin,
          cart_id,
        });

        return {
          token,
          refreshToken,
          user: {
            user_id: newUser.user_id,
            username: newUser.username,
            email: newUser.email,
            cart_id:cart_id
          },
        };
      } else {
        throw new ErrorHandler(401, "Input validation error");
      }
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async login(requestEmail, password,is_admin) {
    try {
      if (!validateUser(requestEmail, password)) {
        throw new ErrorHandler(403, "Invalid login");
      }

      const user = await getUserByEmailDb(requestEmail);

      if (!user) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }

      if (user.google_id && !user.password) {
        throw new ErrorHandler(403, "Login in with Google");
      }

      const {
        password: dbPassword,
        user_id,
        is_admin,
        cart_id,
        username,
        email,
      } = user;
      const isCorrectPassword = await bcrypt.compare(password, dbPassword);

      if (!isCorrectPassword) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }

      const token = await this.signToken({ user_id: user_id, is_admin:is_admin, cart_id:cart_id });
      const refreshToken = await this.signRefreshToken({
        user_id: user_id,
        is_admin:is_admin,
        cart_id:cart_id,
      });
      return {
        token,
        refreshToken,
        user: {
          user_id,
          username,
          email,
          cart_id,
          is_admin
        },
      };
    } catch (error) {
      logger.error(error)
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async googleLogin(code) {
    try {
      const ticket = await this.verifyGoogleIdToken(code);
      const { name, email, sub } = ticket.getPayload();
      const defaultUsername = name.replace(/ /g, "").toLowerCase();

      try {
        const user = await getUserByEmailDb(email);
        if (!user?.google_id) {
          const user = await createUserGoogleDb({
            sub,
            defaultUsername,
            email,
            name,
          });
          await createCartDb(user.user_id);
          await mail.signupMail(user.email, user.fullname.split(" ")[0]);
        }
        const { user_id, cart_id, roles, fullname, username } =
          await getUserByEmailDb(email);

        const token = await this.signToken({
          id: user_id,
          roles,
          cart_id,
        });

        const refreshToken = await this.signRefreshToken({
          id: user_id,
          roles,
          cart_id,
        });

        return {
          token,
          refreshToken,
          user: {
            user_id,
            fullname,
            username,
          },
        };
      } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
      }
    } catch (error) {
      throw new ErrorHandler(401, error.message);
    }
  }

  async generateRefreshToken(data) {
    const payload = await this.verifyRefreshToken(data);

    const token = await this.signToken(payload);
    const refreshToken = await this.signRefreshToken(payload);

    return {
      token,
      refreshToken,
    };
  }

  async forgotPassword(email) {
    const user = await getUserByEmailDb(email);

    if (user) {
      try {
        await setTokenStatusDb(email);

        //Create a random reset token
        var fpSalt = crypto.randomBytes(64).toString("base64");

        //token expires after one hour
        var expireDate = moment().add(1, "h").format();

        await createResetTokenDb({ email, expireDate, fpSalt });

        await mail.forgotPasswordMail(fpSalt, email);
      } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
      }
    } else {
      throw new ErrorHandler(400, "Email not found");
    }
  }

  async verifyResetToken(token, email) {
    try {
      await deleteResetTokenDb(curDate);
      const isTokenValid = await isValidTokenDb({
        token,
        email,
        curDate,
      });

      return isTokenValid;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async resetPassword(password, password2, token, email) {
    const isValidPassword =
      typeof password === "string" && password.trim().length >= 6;

    if (password !== password2) {
      throw new ErrorHandler(400, "Password do not match.");
    }

    if (!isValidPassword) {
      throw new ErrorHandler(
        400,
        "Password length must be at least 6 characters"
      );
    }

    try {
      const isTokenValid = await isValidTokenDb({
        token,
        email,
        curDate,
      });

      if (!isTokenValid)
        throw new ErrorHandler(
          400,
          "Token not found. Please try the reset password process again."
        );

      await setTokenStatusDb(email);

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await changeUserPasswordDb(hashedPassword, email);
      await mail.resetPasswordMail(email);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async verifyGoogleIdToken(code) {
    // https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898
    const oauthClient = new OAuth2Client(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      "postmessage"
    );
    const { tokens } = await oauthClient.getToken(code);

    const ticket = await oauthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.OAUTH_CLIENT_ID,
    });

    return ticket;
  }

  async signToken(data) {
    try {
      return jwt.sign(data, process.env.SECRET, { expiresIn: "1h" });
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, "An error occurred");
    }
  }

  async signRefreshToken(data) {
    try {
      return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: "5h" });
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, error.message);
    }
  }

  async verifyRefreshToken(token) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_SECRET);
      return {
        user_id: payload.user_id,
        is_admin: payload.is_admin,
        cart_id: payload.cart_id,
      };
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, error.message);
    }
  }
}

export default AuthService = new AuthService()
