import express, { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from '../controllers/productController';
import { admin, protect } from '../middleware/authMiddleware';
const router: Router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;
