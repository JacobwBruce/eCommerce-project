import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> {
    /* other props for ChildComponent */
}

const CartScreen: React.FC<Props> = ({ match, location, history }) => {
    const productId = match.params.id;
    return <div>Cart</div>;
};

export default CartScreen;
