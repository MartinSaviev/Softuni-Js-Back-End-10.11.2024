import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET_KEY } from '../config/constants.js';

import User from '../models/User.js';

async function login(email, password) {
	try {
		// Find the user by email
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error('User not found');
		}

		// Compare the provided password with the stored password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error("Password doesn't match");
		}

		// Create JWT payload and sign the token
		const payload = {
			_id: user._id,
			email: user.email,
		};

		const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });

		return token;
	} catch (error) {
		// Log the error and return null
		console.log(error.message);
	}
}

export default {
	login,
};
