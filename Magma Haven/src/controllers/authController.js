import { Router } from 'express';
import authService from '../services/authService.js';
import { getErrorMessage } from '../utils/errUtils.js';
import { isAuth, isGuest } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', isGuest, async (req, res) => {
	const { email, username, password, rePassword } = req.body;

	try {
		const user = await authService.register(
			username,
			email,
			password,
			rePassword
		);

		const token = await authService.generateToken(user);
		res.cookie('auth', token);
		res.redirect('/');
	} catch (err) {
		const error = getErrorMessage(err);

		res.render('auth/register', {
			title: 'Register Page',
			username,
			email,
			error,
		});
	}
});

router.get('/register', isGuest, (req, res) => {
	res.render('auth/register', { title: 'Register' });
});

router.get('/login', isGuest, (req, res) => {
	res.render('auth/login', { title: 'Login' });
});

router.post('/login', isGuest, async (req, res) => {
	const { email, password } = req.body;

	try {
		const token = await authService.login(email, password);

		res.cookie('auth', token);
		res.redirect('/');
	} catch (err) {
		const error = getErrorMessage(err);
		res.render('auth/login', { title: 'Login Page', error });
	}
});

router.get('/logout', isAuth, (req, res) => {
	res.clearCookie('auth');
	res.redirect('/');
});

export default router;
