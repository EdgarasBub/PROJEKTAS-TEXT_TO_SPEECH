import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // Naudojame 5001


mongoose.connect(process.env.dbUrl, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('✅ Prisijungta prie MongoDB'))
    .catch(err => {
        console.error('❌ Mongo klaida:', err);
        process.exit(1);
    });

// CORS konfigūracija
app.use(cors({
    origin: 'http://localhost:5173', // Leidžiame frontendui ant 5173
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🟢 Sveikas! Backend serveris veikia.');
});

// Maršrutai
app.use('/api/auth', authRoutes);

// Testinis endpoint'as
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Serverio paleidimas
app.listen(PORT, () => {
    console.log(`🚀 Backend veikia: http://localhost:${PORT}`);
});