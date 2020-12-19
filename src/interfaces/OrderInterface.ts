export default interface OrderInterface {
    _id: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    orderItems: Array<OrderInterface>;
    user: any;
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
    paidAt: string;
    deliveredAt: string;
    paymentResult: {
        id: string;
        status: any;
        update_time: string;
        email_address: string;
    };
}
