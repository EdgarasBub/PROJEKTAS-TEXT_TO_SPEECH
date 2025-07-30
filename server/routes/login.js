// routes/login.js
import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Patikrinimas ar laukai užpildyti
        if (!email || !password) {
            return res.status(400).json({ message: 'Prašome užpildyti visus laukus' });
        }

        // Ar toks vartotojas egzistuoja?
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Neteisingas el. paštas arba slaptažodis' });
        }

        // Palyginam slaptažodį
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Neteisingas el. paštas arba slaptažodis' });
        }

        // Sukuriam JWT tokeną
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '2h' });

        res.status(200).json({ message: 'Prisijungimas sėkmingas', token });
    } catch (error) {
        console.error('❌ Prisijungimo klaida:', error);
        res.status(500).json({ message: 'Serverio klaida' });
    }
});

export default router;
