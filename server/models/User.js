import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Email validacija
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    collection: 'TextToSpeechLoginInfo' // 👈 Priverstinai nurodome kolekciją
});

// Slaptažodžio šifravimas prieš išsaugojimą
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model('User', userSchema);