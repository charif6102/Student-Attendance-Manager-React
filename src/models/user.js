import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
username: String,
password: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema, 'user');

export default User;