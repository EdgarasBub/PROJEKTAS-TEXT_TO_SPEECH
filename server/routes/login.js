import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validacija
        if (!email || !password) {
            return res.status(400).json({ message: 'Privalomi el. paštas ir slaptažodis' });
        }

        // 2. Vartotojo paieška
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Neteisingas el. paštas' });
        }

        // 3. Slaptažodžio patikrinimas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Neteisingas slaptazodis duomenys' });
        }

        // 4. JWT token generavimas
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        // 5. Atsakymas
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        console.error('❌ Prisijungimo klaida:', error);
        res.status(500).json({ message: 'Serverio klaida' });
    }
});

export default router;