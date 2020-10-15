import express from 'express';
import productRoutes from './routes/productRoutes';
import connectDB from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();

connectDB();

app.get('/', (req, res) => {
    res.send('API is running....');
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running 🚀
    Mode: ${process.env.NODE_ENV} 
    Port: ${PORT}`);
});
