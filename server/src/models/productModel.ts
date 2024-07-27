import mongoose, { Document } from 'mongoose';

interface Product extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true},
  category: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<Product>('Product', productSchema);
