import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};
