import express from 'express'
import { protect, user } from '../middleware/authMiddleware.js';
import { createPODorder } from '../controllers/orderController.js';

const router = express.Router()

//create an order(make payment with paystack)



//create an order(make payment with POD)
router.post("/pod",protect, user, createPODorder)

export default router