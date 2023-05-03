import authService from "../services/auth.service.js"
import {signupMail,resetPasswordMail,forgotPasswordMail} from "../services/mail.service.js"
import { ErrorHandler } from "../helpers/error.js"
import userService from "../services/user.service.js";
const mail = {signupMail,resetPasswordMail,forgotPasswordMail}
const createAccount = async (req, res) => {
  try{
    const { token, refreshToken, user } = await authService.signUp(req.body);
    if (process.env.NODE_ENV === "test") {
      await mail.signupMail(user.email, user.fullname.split(" ")[0]);
    }
  
    res.header("auth-token", token);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? true : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    });
    res.status(201).json({
      token,
      user,
    });
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }


};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("from login controller",email,password)
  // const{email,password,is_admin} = await userService.getUserByEmail(email1)
  try{
    const { token, refreshToken, user } = await authService.login(
      email,
      password
    );
    console.table(user)
    res.header("auth-token", token);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? true : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    });
    res.status(200).json({
      token,
      user,
    });
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }



  // res.status(200).json({
  //   email,
  //   password,
  //   is_admin
  // })
};

const googleLogin = async (req, res) => {
  const { code } = req.body;
  try{
    const user = await authService.googleLogin(code);
    res.header("auth-token", user.token);
    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
    });
    res.json(user);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try{
    await authService.forgotPassword(email);

    res.json({ status: "OK" });
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }

};

// verify password reset token
const verifyResetToken = async (req, res) => {
  const { token, email } = req.body;
  try{
    const isTokenValid = await authService.verifyResetToken(token, email);
    if (!isTokenValid) {
      res.json({
        message: "Token has expired. Please try password reset again.",
        showForm: false,
      });
    } else {
      res.json({
        showForm: true,
      });
    }
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }


};

const refreshToken = async (req, res) => {
  try{
    const tokens = await authService.generateRefreshToken(
      req.cookies.refreshToken
    );

  res.header("auth-token", tokens.token);
  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
  });
  res.json(tokens);
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }
  if (!req.cookies.refreshToken) {
    throw new ErrorHandler(401, "Token missing");
  }

};

const resetPassword = async (req, res) => {
  const { password, password2, token, email } = req.body;
  try{
    await authService.resetPassword(password, password2, token, email);

  res.json({
    status: "OK",
    message: "Password reset. Please login with your new password.",
  });
  }
  catch(err){
    res.status(400).json({message:err.message,stackTrace:err.stack})
  }


};

export{
  createAccount,
  loginUser,
  googleLogin,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  refreshToken,
};
