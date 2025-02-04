import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addbookedService, deleteOneBookingService, getBookedServices, updateBookedServices } from '../controller/booked.controller.js';



const router = express.Router()



router.post('/add', protectRoute, addbookedService)
router.get('/get', protectRoute, getBookedServices)
router.put('/update/:id', protectRoute, updateBookedServices)
router.delete('/delete/:id', protectRoute, deleteOneBookingService)

export default router