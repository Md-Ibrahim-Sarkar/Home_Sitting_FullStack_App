import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addorderProduct, getorderProducts, updateorderProducts, deleteOneOrderProduct, getorderProductsbyId, getorderProductsbyUserId } from '../controller/order.controller.js';



const router = express.Router()



router.post('/', addorderProduct)
router.get('/', getorderProducts)
router.get('/:id', getorderProductsbyId)
router.get('/user/:id', getorderProductsbyUserId)
router.patch('/update/:id', updateorderProducts)
router.delete('/delete/:id', deleteOneOrderProduct)

export default router