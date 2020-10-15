import express from 'express';
// @ts-ignore
import products from './data/products';
import connectDB from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();

connectDB();

app.get('/', (req, res) => {
    res.send('API is running....');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/product/:id', (req, res) => {
    const product = products.find((p: any) => p._id === req.params.id);
    res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running 🚀
    Mode: ${process.env.NODE_ENV} 
    Port: ${PORT}`);
});
