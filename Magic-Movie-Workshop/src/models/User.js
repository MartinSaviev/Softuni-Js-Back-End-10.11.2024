import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		minLength: 10,
	},
	password: {
		type: String,
        minLength: [3, 'Your password is too short!'],
	},
});

userSchema.pre('save', async function () {
	const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
	this.password = hash;
});

const User = model('User', userSchema);

export default User;
