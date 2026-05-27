import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true, minlength: 2 },
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true,
                match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'] },
    password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;