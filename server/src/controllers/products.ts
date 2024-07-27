import Product from '../models/productModel'
import { Request, Response } from 'express';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        if (products.length === 0) return res.status(404).json({ error: 'No products found' });

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, image } = req.body;
        if (!name || !description || !price || !stock || !category || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const product = new Product({ name, description, price, stock, category, image });
        await product.save();

        res.status(201).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
