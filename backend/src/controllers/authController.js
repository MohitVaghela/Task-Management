import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import TokenBlacklist from '../models/TokenBlacklist.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ message: 'username, email and password are required' });

        if (!emailRegex.test(email))
            return res.status(400).json({ message: 'Invalid email format' });

        if (password.length < 6)
            return res.status(400).json({ message: 'Password must be at least 6 characters' });

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) return res.status(400).json({ message: 'Email already in use' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashed });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: 'Email and password are required' });

        if (!emailRegex.test(email))
            return res.status(400).json({ message: 'Invalid email format' });

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        await TokenBlacklist.create({
            token: req.token,
            expiresAt: new Date(req.tokenExp * 1000)
        });
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
};
