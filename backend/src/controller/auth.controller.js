import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../lib/jwtUtils.js';
import cloudinary from '../lib/cloudinary.js';
import user from '../models/user.model.js';

export const signup = async (req, res) => {
  const { fullName, password, email } = req.body
  try {
    // validate input fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    // check if user already exists
    const user = await User.findOne({ email })

    if (user) return res.status(400).json({ message: 'User already exists' });

    //  hash password
    const solt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, solt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });


    // save user to database
    if (newUser) {
      // generate jwt token
      const token = generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      }
      );
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

  } catch (error) {
    console.log(error);
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid User" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid User" })
    }

    generateToken(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    })
  } catch (error) {

  }
}

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" })
  }
}


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(req.body);

    // Update user profile picture
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: req.body.profilePic,
        fullName: req.body.fullName
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" })

  }
}





export const getUsers = async (req, res) => {
  try {
    const service = await user.find();
    res.json(service);
  } catch (error) {
    console.error("Failed to get services:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

