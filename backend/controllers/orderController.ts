import express from 'express';
import asyncHandler from 'express-async-handler';
import UserRequest from '../interfaces/UserRequest';
import Order from '../models/orderModel';

// @desc    create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user!._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});
