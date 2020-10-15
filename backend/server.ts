import express from 'express';
import productRoutes from './routes/productRoutes';
import connectDB from './config/db';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorMiddleware';
dotenv.config();

const app: express.Application = express();

connectDB();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('API is running....');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running 🚀
    Mode: ${process.env.NODE_ENV} 
    Port: ${PORT}`);
});
