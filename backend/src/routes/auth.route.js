import express from 'express';
import { checkAuth, getUsers, login, logout, signup, updateProfile } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import ImageKit from 'imagekit';


const router = express.Router();


router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)
router.get('/users', getUsers)

router.put('/update-profile', protectRoute, updateProfile)

// ********************************** Image Kit ********************************
// ImageKit কনফিগারেশন
const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,  // .env ফাইল থেকে পাবেন
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // .env ফাইল থেকে পাবেন
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // .env ফাইল থেকে পাবেন
});


const uploadAuth = async (req, res) => {
  const result = imageKit.getAuthenticationParameters();
  res.send(result);
};

router.get("/upload-auth", uploadAuth);


// ************************ end image kit ************************

router.get('/check', protectRoute, checkAuth)


export default router;

