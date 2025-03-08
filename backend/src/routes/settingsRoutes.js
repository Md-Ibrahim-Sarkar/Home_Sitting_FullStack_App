import express from 'express';
import { getSettings, updateSettings } from '../controller/settingsController.js';

const router = express.Router();

// Get settings (public)
router.get('/', getSettings);

// Update settings (admin only)
router.put('/', updateSettings);

export default router; 