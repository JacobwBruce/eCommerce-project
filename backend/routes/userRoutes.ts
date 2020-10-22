import express, { Router } from 'express';
import { register } from '../../frontend/src/serviceWorker';
import { authUser, getUserProfile, registerUser } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
