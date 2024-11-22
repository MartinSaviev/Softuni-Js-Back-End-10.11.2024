import { Router } from 'express';
import authService from '../services/authService.js';
import { getErrorMessage } from '../utils/errUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', async (req, res) => {
	const { email, password, rePassword } = req.body;

	try {
		const user = await authService.register(email, password, rePassword);

		const token = await authService.generateToken(user);
		res.cookie('auth', token);
		res.redirect('/');
	} catch (err) {
		const error = getErrorMessage(err);

		res.render('auth/register', {
			title: 'Register Page',
			email,
			error,
		});
	}
});

router.get('/register', (req, res) => {
	res.render('auth/register', { title: 'Register' });
});

router.get('/login', (req, res) => {
	res.render('auth/login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
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

router.get('/logout',isAuth, (req, res) => {
	res.clearCookie('auth');
	res.redirect('/');
});

export default router;
