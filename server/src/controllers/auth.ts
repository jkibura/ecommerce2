import User from '../models/userModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const createToken = (user: any) => {
    //DELETED { EXPIRESIN: ' '}
    return jwt.sign({ id: user._id, role: user.role }, process.env.SECRET);
}

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const exists = await User.findOne({ email });
        if (exists) { 
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, role: 'user' });
        await user.save();

        const token = createToken(user);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Wrong password' });
        }

        const token = createToken(user);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
