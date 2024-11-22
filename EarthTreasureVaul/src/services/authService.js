import jwt from '../lib/jwt.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { SECRET_KEY } from '../constants/secretKey.js';

async function register(email, password, rePassword) {
	const user = await User.findOne({email});

	if (password !== rePassword) {
		throw new Error('Passwords do not match.');
	}

	if (user) {
		throw new Error('Email or username already exists.');
	}
	return User.create({email, password });
}

async function login(email, password) {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Invalid email or password.');
	}

	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) {
		throw new Error('Invalid email or password.');
	}

	return generateToken(user);
}

async function generateToken(user) {
	const payload = {
		_id: user._id,
		email: user.email,
	};

	const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
	return token;
}

export default {
	register,
	login,
	generateToken,
};
