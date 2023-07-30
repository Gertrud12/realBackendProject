import express from 'express'
const router = express.Router();
import { createAdmin, login, sendOtp, updatePassword, signOut } from '../controllers/adminController.js';
import { protect, admin} from '../middleware/authMiddleware.js'


router.post('/registration', createAdmin)
router.post('/login', login)
router.post('/otp', sendOtp)
router.post('/new/password', updatePassword)
router.get('/logout', protect, admin, signOut)



export default router