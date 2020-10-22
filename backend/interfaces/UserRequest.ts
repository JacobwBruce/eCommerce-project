import express from 'express';

export default interface UserRequest extends express.Request {
    user?: {
        _id: string;
    };
}
