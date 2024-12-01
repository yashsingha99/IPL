const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username?.trim() || !name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Insufficient data" });
    }

    const isUserExist = await User.findOne({ $or: [{ email }, { username }] });
    if (isUserExist) {
      return res.status(400).json({ message: "User with email or username already exists" });
    }

    const newUser = await User.create({ username, name, email, password });

    const user = await User.findById(newUser._id).select("-password");

    return res.status(200).json({ user, message: "User successfully created" });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
        if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    
    // Check if the password matches
    const isMatch = await user.isPasswordCorrect(password);
    // console.log(isMatch)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id, username: user.username, name: user.name, email: user.email}, process.env.SECRET, {
      expiresIn: '7d'
    });

    return res.status(200).json({ user, token, message: "User LoggedIn Successfully" });
   
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.body._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user, message: "Successfully retrieved current user" });
  } catch (error) {
    console.error("GetCurrentUser Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { newPassword, oldPassword, userId } = req.body;

    if (!newPassword || !oldPassword || !userId) {
      return res.status(400).json({ message: "Insufficient data" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await user.isPasswordCorrect(oldPassword);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({ message: "Password successfully changed" });
  } catch (error) {
    console.error("ChangePassword Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const search = req.body.search || "";
    const keyword = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({
      _id: { $ne: req.body._id },
    });

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("FetchAllUsers Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UpdateProfile function can be implemented similarly based on your needs.

module.exports = {
  register,
  login,
  getCurrentUser,
  changePassword,
  fetchAllUsers,
};
