import express from 'express';
import asyncHandler from 'express-async-handler';
import UserRequest from '../interfaces/UserRequest';
import Product from '../models/productModel';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req: express.Request, res: express.Response) => {
    const products = await Product.find({});

    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req: express.Request, res: express.Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.json(product);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req: express.Request, res: express.Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    } else {
        await product.remove();
        res.json({ message: 'Product removed' });
    }

    res.json(product);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user?._id,
        image: '/images/sample.jpeg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { name, price, description, image, brand, countInStock, category } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    } else {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.countInStock = countInStock;
        product.category = category;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    }
});
