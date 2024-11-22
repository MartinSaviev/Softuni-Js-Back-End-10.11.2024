import { Router } from 'express';
import createService from '../services/createService.js';
import { getErrorMessage } from '../utils/errUtils.js';

const router = Router();

router.get('/create', (req, res) => {
	res.render('create', { title: 'Create Page' });
});

router.post('/create', async (req, res) => {
	const data = req.body;
	const userId = req.user._id;

	try {
		await createService.create(data, userId);
		res.redirect('/');
	} catch (err) {
		const error = getErrorMessage(err);
		res.render('create', { title: 'Create Page', error, data });
	}
});

export default router;
