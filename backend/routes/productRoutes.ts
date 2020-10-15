import express, { Router } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

const router: Router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({});

        res.json(products);
    })
);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    })
);

export default router;
