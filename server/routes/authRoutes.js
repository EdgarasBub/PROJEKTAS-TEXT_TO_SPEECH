// routes/authRoutes.js
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// REGISTER endpoint
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Vartotojas sukurtas!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Klaida registruojant vartotoją' });
    }
});

// LOGIN endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: 'Vartotojas nerastas' });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Neteisingas slaptažodis' });
        }

        res.status(200).json({ message: 'Prisijungimas sėkmingas!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Prisijungimo klaida' });
    }
});

export default router;
