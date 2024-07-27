import User from '../models/userModel'
import Product from '../models/productModel'



export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (quantity <= 0) return res.status(400).json({ error: 'Quantity must be greater than zero' });
        
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: 'Account not found' });
        
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        
        const existingCartItem = user.cart.find(item => item.product.toString() === productId);
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }
        await user.save();

        res.status(200).json({ message: 'Added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getCart = async(req, res)=> {
    try{
        const user = await User.findById(req.user._id)
        if(!user) return res.status(404).json({error: 'Account not found'})

        if(user.cart.length == 0) return res.status(400).json({error: 'No item found in your cart'})

        const cart = user.cart
        res.status(200).json({ cart })
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

export const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (quantity <= 0) return res.status(400).json({ error: 'Quantity must be greater than zero' });

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: 'Account not found' });

        const cartItem = user.cart.find(item => item.product.toString() === productId);
        if (!cartItem) return res.status(400).json({ error: 'Product not found in your cart' });

        cartItem.quantity = quantity;
        await user.save();

        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: 'Account not found' });

        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        await user.save();

        res.status(200).json({ message: 'Removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
