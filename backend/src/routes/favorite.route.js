import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addFavorites, deleteFavorite, getFavorites } from '../controller/favorite.controller.js';

const router = express.Router()




router.post('/add', protectRoute, addFavorites)
router.get('/get', protectRoute, getFavorites)
router.delete('/delete/:id', protectRoute, deleteFavorite)


export default router