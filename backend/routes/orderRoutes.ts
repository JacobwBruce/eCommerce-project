import express, { Router } from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToPaid,
} from '../controllers/orderController';

import { admin, protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
