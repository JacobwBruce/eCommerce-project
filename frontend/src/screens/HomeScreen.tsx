import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';

interface ProductType {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}

const HomeScreen: React.FC = () => {
    const [products, setProducts] = useState<Array<ProductType>>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data }: any = await axios.get('/api/products');

            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;
