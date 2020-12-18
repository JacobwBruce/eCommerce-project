import express, { Router } from 'express';
import {
    createProduct,
    createReview,
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
router.route('/:id/reviews').post(protect, createReview);

export default router;
