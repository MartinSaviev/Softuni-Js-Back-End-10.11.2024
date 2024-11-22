import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		minLength: 2,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		minLength: 10,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minLength: 4,
	},
});

userSchema.pre('save', async function () {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
});

const User = model('User', userSchema);

export default User;
