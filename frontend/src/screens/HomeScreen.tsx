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
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen: React.FC<RouteComponentProps> = ({ match }) => {
    //@ts-ignore
    const keyword = match.params.keyword;

    //@ts-ignore
    const pageNumber = match.params.pageNumber || 1;

    const dispatch: Dispatch<any> = useDispatch();

    //@ts-ignore
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />
            <div className='mt-3'>{!keyword && <ProductCarousel />}</div>
            <h1 className='mt-3'>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product: ProductInterface) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    );
};

export default HomeScreen;
