import express from 'express';
import asyncHandler from 'express-async-handler';
import UserRequest from '../interfaces/UserRequest';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    // @ts-ignore
    if (user && (await user.matchPassword(password))) {
        delete user._doc.password;
        res.json({ ...user._doc, token: generateToken(user._id) });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req: express.Request, res: express.Response) => {
    let { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // @ts-ignore
    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
    });

    if (user) {
        res.status(201);
        delete user._doc.password;
        res.json({ ...user._doc, token: generateToken(user._id) });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const user = await User.findById(req.user!._id);

    if (user) {
        delete user._doc.password;
        res.json({ ...user._doc });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const user = await User.findById(req.user!._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) user.password = req.body.password;
        user.email = user.email.toLowerCase();
        const updatedUser = await user.save();

        delete updatedUser._doc.password;
        res.json({ ...updatedUser._doc });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private / Admin
export const getUsers = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const users = await User.find({});

    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private / Admin
export const deleteUser = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private / Admin
export const getUserById = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || false;
        user.email = user.email.toLowerCase();
        const updatedUser = await user.save();

        delete updatedUser._doc.password;
        res.json({ ...updatedUser._doc });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
