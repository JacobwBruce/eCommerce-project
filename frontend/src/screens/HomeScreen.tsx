import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import ProductInterface from '../interfaces/ProductInterface';
import { RouteComponentProps } from 'react-router-dom';

const HomeScreen: React.FC<RouteComponentProps> = ({ match }) => {
    //@ts-ignore
    const keyword = match.params.keyword;

    const dispatch: Dispatch<any> = useDispatch();

    //@ts-ignore
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <>
            <h1 className='mt-3'>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map((product: ProductInterface) => (
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
