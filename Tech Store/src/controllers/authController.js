import { Router } from 'express';
import authService from '../services/authService.js';
import { getErrorMessage } from '../utils/errUtils.js';
import { isAuth, isGuest } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/register', isGuest, (req, res) => {
	res.render('auth/register', { title: 'TechStore - Register' });
});

router.post('/register', isGuest, async (req, res) => {
	const { email, password, rePassword } = req.body;

	try {
		const user = await authService.register(email, password, rePassword);

		const token = await authService.generateToken(user);
		res.cookie('auth', token);
		res.redirect('/');
	} catch (err) {
		const error = getErrorMessage(err);

		res.render('auth/register', {
			title: 'TechStore - Register',
			email,
			error,
		});
	}
});

router.get('/login', isGuest, (req, res) => {
	res.render('auth/login', { title: 'TechStore - Login' });
});

router.post('/login', isGuest, async (req, res) => {
	const { email, password } = req.body;

	try {
		const token = await authService.login(email, password);

		res.cookie('auth', token);
		res.redirect('/');
	} catch (err) {
		const error = getErrorMessage(err);
		res.render('auth/login', { title: 'TechStore - Login', email, error });
	}
});

router.get('/logout', isAuth, (req, res) => {
	res.clearCookie('auth');
	res.redirect('/');
});

export default router;
