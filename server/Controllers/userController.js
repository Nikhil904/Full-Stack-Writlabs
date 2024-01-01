import User from "../Models/UserModel.js";
import { sendResponse } from "../Response/response.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      return sendResponse(
        res,
        200,
        true,
        "Users retrieved successfully",
        users
      );
    } else {
      return sendResponse(res, 200, true, "No users found", []);
    }
  } catch (error) {
    return sendResponse(
      res,
      404,
      false,
      "Something went wrong!!!",
      error.message
    );
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      return sendResponse(res, 200, true, "User retrieved successfully", user);
    } else {
      return sendResponse(res, 200, true, "User not found", null);
    }
  } catch (error) {
    return sendResponse(
      res,
      404,
      false,
      "Something went wrong!!!",
      error.message
    );
  }
};

export const createUser = async (req, res) => {
  let data = req.body;
  try {
    let user = new User(data);
    user = await user.save();
    return sendResponse(res, 200, true, "Data Added Successfully", user);
  } catch (error) {
    return sendResponse(
      res,
      404,
      false,
      "Something went wrong!!!",
      error.message
    );
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (user) {
      return sendResponse(res, 200, true, "User updated successfully", user);
    } else {
      return sendResponse(res, 200, true, "User not found", null);
    }
  } catch (error) {
    return sendResponse(
      res,
      404,
      false,
      "Something Went Wrong!!!",
      error.message
    );
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      return sendResponse(res, 200, true, "User Deleted successfully", user);
    } else {
      return sendResponse(res, 200, true, "User not found", null);
    }
  } catch (error) {
    return sendResponse(
      res,
      404,
      false,
      "Something went Wrong!!!",
      error.message
    );
  }
};
