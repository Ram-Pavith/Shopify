import userService from "../services/user.service.js"
import { ErrorHandler } from "../helpers/error.js"
// import { hashPassword } from "../helpers/hashPassword.js"
const getAllUsers = async (req, res) => {
  const results = await userService.getAllUsers();
  res.status(200).json(results);
};

const createUser = async (req, res) => {
  const { username, password, email,city,state,country } = req.body;
  const hashedPassword = hashPassword(password);

  const user = await userService.createUser({
    username,
    password:hashedPassword,
    email,
    city,
    state,
    country
  });

  res.status(201).json({
    status: "success",
    user,
  });
};

const getUserById = async (req, res) => {
  const { user_id } = req.params.user_id;
  if (+user_id === req.user.id || req.user.is_admin) {
    try {
      const user = await userService.getUserById(id);
      return res.status(200).json(user);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, "User not found");
    }
  }
  throw new ErrorHandler(401, "Unauthorized");
};

const getUserProfile = async (req, res) => {
  const { user_id } = req.user;

  const user = await userService.getUserById(user_id);

  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { username, email, address, city, state, country } = req.body;
  if (+req.params.user_id === req.user.user_id || req.user.is_admin) {
    try {
      const results = await userService.updateUser({
        username,
        email,
        address,
        city,
        state,
        country,
        user_id: req.params.user_id,
      });
      return res.status(201).json(results);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  throw new ErrorHandler(401, "Unauthorized");
};

const deleteUser = async (req, res) => {
  const { user_id } = req.params.user_id;
  if (+user_id === req.user.user_id || req.user.is_admin) {
    try {
      const result = await userService.deleteUser(id);
      res.status(200).json(result);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  throw new ErrorHandler(401, "Unauthorized");
};

export {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
};
