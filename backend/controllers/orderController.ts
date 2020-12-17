import express from 'express';
import asyncHandler from 'express-async-handler';
import OrderPayment from '../interfaces/OrderPayment';
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

// @desc    get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req: express.Request, res: express.Response) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(
    async (req: express.Request, res: express.Response) => {
        const order: OrderPayment | null = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.stated,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            };

            try {
                const updatedOrder = await order.save();
                res.json(updatedOrder);
            } catch (er) {
                console.log(er);
            }
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    }
);

// @desc    get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const orders: Array<OrderPayment> | null = await Order.find({ user: req.user!._id });
    res.json(orders);
});

// @desc    get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});
