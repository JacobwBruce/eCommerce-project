import jwt from 'jsonwebtoken';

export default (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};
