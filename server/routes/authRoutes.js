import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Privalomi visi laukai' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Vartotojas jau egzistuoja' });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'Registracija sėkminga' });
    } catch (error) {
        console.error('❌ Registracijos klaida:', error);
        res.status(500).json({ message: 'Serverio klaida' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Privalomi visi laukai' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Neteisingi duomenys' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Neteisingi duomenys' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, userId: user._id });
    } catch (error) {
        console.error('❌ Prisijungimo klaida:', error);
        res.status(500).json({ message: 'Serverio klaida' });
    }
});

export default router;