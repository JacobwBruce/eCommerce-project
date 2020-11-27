import express, { Router } from 'express';
import { addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/orderController';

import { protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
