import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  syncCart
} from '../controller/cart.controller.js';

const router = express.Router();

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/:productId', removeFromCart);
router.put('/:productId', updateQuantity);
router.post('/sync', syncCart);

export default router; 