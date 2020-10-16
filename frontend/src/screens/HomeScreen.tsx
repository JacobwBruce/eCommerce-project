import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
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
    const dispatch: Dispatch<any> = useDispatch();

    //@ts-ignore
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map((product: ProductType) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default HomeScreen;
