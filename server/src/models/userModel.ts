import mongoose, { Document } from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
  role: 'user' | 'admin';
  cart: Array<{ product: mongoose.Types.ObjectId, quantity: number }>;
  orders: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  cart: [{ product: { type: mongoose.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  orders: [{ type: mongoose.Types.ObjectId, ref: 'Order' }],
});

export default mongoose.model<User>('User', userSchema);
