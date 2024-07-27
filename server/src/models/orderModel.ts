import mongoose, { Document } from 'mongoose';

interface Order extends Document {
  user: mongoose.Types.ObjectId;
  products: Array<{ product: mongoose.Types.ObjectId, quantity: number }>;
  status: 'pending' | 'shipped' | 'delivered';
}

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  products: [{ product: { type: mongoose.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
});

export default mongoose.model<Order>('Order', orderSchema);
