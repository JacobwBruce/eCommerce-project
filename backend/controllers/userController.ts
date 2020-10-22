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

    const user = await User.findOne({ email });
    // @ts-ignore
    if (user && (await user.matchPassword(password))) {
        // @ts-ignore
        delete user._doc.password;
        // @ts-ignore
        res.json({ ...user._doc, token: generateToken(user._id) });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req: UserRequest, res: express.Response) => {
    const user = await User.findById(req.user!._id);

    if (user) {
        // @ts-ignore
        delete user._doc.password;
        // @ts-ignore
        res.json({ ...user._doc });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
