import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import users from './data/users';
import products from './data/products';
import User from './models/userModel';
import Product from './models/productModel';
import Order from './models/orderModel';
import connectDB from './config/db';

connectDB();

const importData = async () => {
    try {
        // @ts-ignore
        await Order.deleteMany();
        // @ts-ignore
        await Product.deleteMany();
        // @ts-ignore
        await User.deleteMany();
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product: any) => ({ ...product, user: adminUser }));

        await Product.insertMany(sampleProducts);
        console.log('Data Imported!');

        process.exit();
    } catch (err) {
        console.error(`Error importing data: ${err}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // @ts-ignore
        await Order.deleteMany();
        // @ts-ignore
        await Product.deleteMany();
        // @ts-ignore
        await User.deleteMany();

        console.log('Data Destroyed!');

        process.exit();
    } catch (err) {
        console.error(`Error importing data: ${err}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
