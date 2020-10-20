import express, { Router } from 'express';
import { authUser } from '../controllers/userController';
const router: Router = express.Router();

router.post('/login', authUser);

export default router;
