import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/constants.js';

async function register(email, password) {
	// Check if email already exists
	const findUser = await User.findOne({ email: email });
	if (findUser) {
		throw new Error('Email already exists');
	}
	const user = User.create({ email: email, password: password });

	if (!user) {
		throw new Error('Email already exists');
	}

	const payload = {
		_id: user._id,
		email: user.email,
	};

	const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });

	return token;
}

export default {
	register,
};
