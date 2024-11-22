import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/constants.js';

export function authMiddleware(req, res, next) {
	const token = req.cookies['auth'];

	if (!token) {
		return next();
	}

	try {
		const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
		const user = {
			_id: decodedToken._id,
			email: decodedToken.email,
		};

		req.user = user;
		res.locals.user = user._id;
		res.locals.userEmail = user.email;
        res.locals.isAuthenticated = true;

		return next();
	} catch (error) {
		res.clearCookie('auth');
		console.log(error.message);

		return res.redirect('/login');
	}
}
