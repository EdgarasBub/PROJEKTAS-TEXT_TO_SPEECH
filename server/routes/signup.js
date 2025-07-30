import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validacija
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Privalomas el. paštas ir slaptažodis'
            });
        }

        // Patikriname ar vartotojas jau egzistuoja TIKSLIOJE KOLEKIJOJE
        const existingUser = await User.findOne({ email }).collation({
            locale: 'en',
            strength: 2 // Case-insensitive paieška
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Vartotojas jau egzistuoja'
            });
        }

        // Sukuriame naują vartotoją (slaptažodis automatiškai užšifruojamas per modelio hook'ą)
        const newUser = new User({ email, password });
        await newUser.save();

        // Sėkmingas atsakymas
        res.status(201).json({
            success: true,
            message: 'Registracija sėkminga',
            user: {
                email: newUser.email,
                id: newUser._id
            }
        });

        // DEBUG: Patikriname įrašą tiesiogiai MongoDB
        // console.log('Įrašas duomenų bazėje:', await User.findOne({ email }));

    } catch (error) {
        console.error('❌ Klaida:', error);
        res.status(500).json({
            success: false,
            message: 'Serverio klaida',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
});

export default router;