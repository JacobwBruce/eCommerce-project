import express, { Router } from 'express';
import {
    authUser,
    getUserProfile,
    getUsers,
    registerUser,
    updateUserProfile,
} from '../controllers/userController';
import { admin, protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
