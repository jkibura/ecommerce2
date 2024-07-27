import User from '../models/userModel'
import Order from '../models/orderModel'

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId });
        if (orders.length === 0) return res.status(404).json({ error: 'No orders found' });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const placeUserOrder = async (req, res) => {
    try {
        const { products } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'Account not found' });

        const orderItems = products.map(item => ({
            product: item.productId,
            quantity: item.quantity
        }));

        const newOrder = new Order({
            user: userId,
            products: orderItems
        });
        await newOrder.save();

        res.status(201).json({ order: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//REVISE TO UPDATE ORDER QUANTITY
export const updateUserOrder = async (req, res) => {
    try {
        const { id, status } = req.body;
        if (!['pending', 'shipped', 'delivered'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        order.status = status;
        await order.save();

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteUserOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const adminGetAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'email');
        if (orders.length === 0) return res.status(404).json({ error: 'No orders found' });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const adminUpdateOrderStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        if (!['pending', 'shipped', 'delivered'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        order.status = status;
        await order.save();

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
