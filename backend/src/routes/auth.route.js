import express from 'express';
import { addUser, getUsers, updateUser, getUserByUid } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import ImageKit from 'imagekit';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { generateToken } from '../lib/jwtUtils.js';

// Configure dotenv at the top of the file
dotenv.config();

const router = express.Router();


router.post('/user', addUser)
router.get('/users', getUsers)
router.get('/user/:uid', getUserByUid)
router.put('/update-user', updateUser)


// ********************************** Image Kit ********************************
// ImageKit কনফিগারেশন
const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ""
});


const uploadAuth = async (req, res) => {
  try {
    const result = imageKit.getAuthenticationParameters();
    res.send(result);
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    res.status(500).json({ message: "Failed to get ImageKit authentication" });
  }
};

router.get("/upload-auth", uploadAuth);


// ************************ end image kit ************************



// jwt token create with route 
router.post('/jwt', async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    const token = generateToken(req.body.userId, res);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error generating token', error: error.message });
  }
});

// jwt token verify with route 
router.post('/jwt-verify', async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.status(200).json({ decoded });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    res.status(500).json({ message: 'Error verifying token', error: error.message });
  }
});

// jwt token clear with route 
router.post('/jwt-clear', async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'JWT token cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing token', error: error.message });
  }
});


export default router;

