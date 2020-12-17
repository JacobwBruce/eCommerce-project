import express from 'express';
import path from 'path';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import uploadRoutes from './routes/uploadRoutes';
import connectDB from './config/db';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorMiddleware';
dotenv.config();

connectDB();

const app: express.Application = express();

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('API is running....');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req: express.Request, res: express.Response) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running 🚀
    Mode: ${process.env.NODE_ENV} 
    Port: ${PORT}`);
});
