import { Router } from 'express';
import loginService from '../services/loginService.js';

const router = Router();

router.get('/login', (req, res) => {
	res.render('login',{title: 'Login'});
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const token = await loginService.login(email, password);
	res.cookie('auth', token);

	res.redirect('/');
});

export default router;
