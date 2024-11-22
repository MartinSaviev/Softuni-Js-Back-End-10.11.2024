import { Router } from 'express';
import castService from '../services/castsService.js';

const router = Router();

router.get('/create-cast', (req, res) => {
	res.render('create-cast');
});

router.post('/create-cast', async (req, res) => {
	await castService.createCasts(req.body);

	res.render('create-cast');
});

export default router;
