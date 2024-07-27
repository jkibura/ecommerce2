import jwt from 'jsonwebtoken'
import User from '../models/userModel'

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'No token provided' });

        const decoded: any = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ error: 'Invalid token' });

        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export const checkRole = (roles: string[]) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    }
}
