import express from 'express';
import { UserDocument } from '../models/userModel';

export default interface UserRequest extends express.Request {
    user?: UserDocument;
}
