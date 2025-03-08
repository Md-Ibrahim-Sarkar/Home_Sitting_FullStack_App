import User from '../models/user.model.js';
import { generateToken } from '../lib/jwtUtils.js';


export const addUser = async (req, res) => {
  try {
    const { fullName, email, profilePic, role, uid } = req.body; // uid ফিল্ড যোগ করা হয়েছে

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Set default profilePic if not provided
    const userProfilePic = profilePic || "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid";

    // Create new user with uid
    const newUser = new User({
      fullName,
      email,
      profilePic: userProfilePic,
      role: role || "user", // Default to "user" if role is not provided
      uid, // Include uid here
    });

    await newUser.save();

    // Return response
    return res.status(201).json({
      message: "User added successfully",
      user: { id: newUser._id, fullName, email, profilePic: userProfilePic, role, uid },
    });

  } catch (error) {
    console.error("Failed to add user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const updateUser = async (req, res) => {
  try {
    const { uid, fullName, phone, address, bio, profilePic } = req.body;

    // Validate required fields
    if (!uid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find user by uid
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      {
        $set: {
          fullName: fullName || user.fullName,
          phone: phone || user.phone,
          address: address || user.address,
          bio: bio || user.bio,
          profilePic: profilePic || user.profilePic,
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Failed to update user" });
    }

    // Return success response
    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        uid: updatedUser.uid,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        bio: updatedUser.bio,
        profilePic: updatedUser.profilePic,
        role: updatedUser.role
      }
    });

  } catch (error) {
    console.error("Error updating profile:", error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation Error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    // Handle other errors
    return res.status(500).json({
      message: "Failed to update profile",
      error: error.message
    });
  }
};






export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getUserByUid = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid });
    res.json(user);
  } catch (error) {
    console.error("Failed to get user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

