import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row, Image } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

interface Props {
    match: {
        [key: string]: any;
    };
}

const ProductScreen: React.FC<Props> = ({ match }) => {
    const [product, setProduct] = useState<any>({});

    useEffect(() => {
        const fetchProduct = async () => {
            const { data }: any = await axios.get(`/api/products/${match.params.id}`);
            setProduct(data);
        };

        fetchProduct();
    }, [match]);

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;