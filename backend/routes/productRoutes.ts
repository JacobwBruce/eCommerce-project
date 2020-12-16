import express, { Router } from 'express';
import { deleteProduct, getProductById, getProducts } from '../controllers/productController';
import { admin, protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;
