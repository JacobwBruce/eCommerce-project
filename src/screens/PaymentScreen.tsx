import React, { FC, useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import ShippingAddressInterface from '../interfaces/ShippingAddressInterface';
import CheckOutSteps from '../components/CheckoutSteps';

interface Props extends RouteComponentProps<any> {}

const PaymentScreen: FC<Props> = ({ history }) => {
    //@ts-ignore
    const cart = useSelector((state) => state.cart);
    const shippingAddress: ShippingAddressInterface = cart.shippingAddress;

    if (shippingAddress.address === '') {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    };

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>

                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPaymentMethod(e.target.value)
                            }
                        ></Form.Check>
                        {/* <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPaymentMethod(e.target.value)
                            }
                        ></Form.Check>{' '} */}
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </form>
        </FormContainer>
    );
};

export default PaymentScreen;
