import mongoose from 'mongoose';

export default interface OrderPayment extends mongoose.Document {
    paymentResult?: { id: any; status: any; update_time: any; email_address: any };
    isPaid?: boolean;
    paidAt?: number;
}
