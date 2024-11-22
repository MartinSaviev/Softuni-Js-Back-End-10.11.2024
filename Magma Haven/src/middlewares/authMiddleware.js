import jwt from '../lib/jwt.js';
import { SECRET_KEY } from '../constants/secretKey.js';

export const authMiddleware = async (req, res, next) => {
	const token = req.cookies['auth'];

	if (!token) {
		return next();
	}

	try {
		const decodedToken = await jwt.verify(token, SECRET_KEY);
		req.user = decodedToken;
		req.isAuthenticated = true;

		res.locals.isAuthenticated = true;
		res.locals.user = decodedToken;

		next();
	} catch (error) {
		res.clearCookie('auth');
		res.redirect('/login');
	}
};

export const isAuth = (req, res, next) => {
	if (!req.user) {
		return res.redirect('/login');
	}
	next();
};

export const isGuest = (req, res, next) => {
	if (req.user) {
		return res.redirect('/404');
	}
	next();
};
