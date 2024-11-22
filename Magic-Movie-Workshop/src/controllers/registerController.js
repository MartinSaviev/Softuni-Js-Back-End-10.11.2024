import { Router } from 'express';
import registerService from '../services/registerService.js';


const router = Router();

router.get('/register', (req, res) => {
	res.render('register', { title: 'Register' });
});

router.post('/register', async (req, res) => {
	const { email, password } = req.body;

	try {
		const token = await registerService.register(email, password);
		res.cookie('auth', token);
		
	} catch (error) {
		console.log(error.message);
	}

	res.redirect('/login');
});

export default router;
