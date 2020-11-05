import React, { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import ShippingAddressInterface from '../interfaces/ShippingAddressInterface';
import CheckOutSteps from '../components/CheckoutSteps';

interface Props extends RouteComponentProps<any> {}

const ShippingScreen: FC<Props> = ({ history }) => {
    //@ts-ignore
    const cart = useSelector((state) => state.cart);
    const shippingAddress: ShippingAddressInterface = cart.shippingAddress;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    };

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Shipping</h1>
            <form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e: any) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='name'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e: any) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='name'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        required
                        onChange={(e: any) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='name'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        required
                        onChange={(e: any) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </form>
        </FormContainer>
    );
};

export default ShippingScreen;
