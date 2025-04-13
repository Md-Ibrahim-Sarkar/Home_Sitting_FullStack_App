

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config(); // Load environment variables

// Ensure the environment variables are correctly named
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Fixed typo
  api_key: process.env.CLOUDINARY_API_KEY, // Fixed typo
  api_secret: process.env.CLOUDINARY_API_SECRET, // Fixed typo
  secure: true, // Ensures secure URLs (https)
});

export default cloudinary;
