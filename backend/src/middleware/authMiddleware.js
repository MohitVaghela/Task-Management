import jwt from 'jsonwebtoken';
import TokenBlacklist from '../models/TokenBlacklist.js';

const protect = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = auth.split(' ')[1];

    try {
        const blacklisted = await TokenBlacklist.findOne({ token });
        if (blacklisted) return res.status(401).json({ message: 'Token has been logged out' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.token = token;
        req.tokenExp = decoded.exp;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default protect;
