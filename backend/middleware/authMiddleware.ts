import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import express, { NextFunction } from 'express';
import User from '../models/userModel';
import { Error } from 'mongoose';
import UserRequest from '../interfaces/UserRequest';

export const protect = asyncHandler(
    async (req: UserRequest, res: express.Response, next: NextFunction) => {
        let token: string;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET!);
                //@ts-ignore
                req.user = await User.findById(decoded.id).select('-password');

                next();
            } catch (err) {
                console.error(err);
                res.status(401);
                throw new Error('Not authorized, token failed');
            }
        }
        //@ts-ignore
        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token');
        }
    }
);

export const admin = (req: UserRequest, res: express.Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};
