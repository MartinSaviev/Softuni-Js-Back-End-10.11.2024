import { Router } from 'express';
import homeService from '../services/homeService.js';

const router = Router();
router.get('/', async (req, res) => {
	const stones = await homeService.load();
	const lastThreeStones = stones.splice(-3);
	
	res.render('home', { title: 'Home Page', stones:lastThreeStones });
});

//TODO: text remove
router.get('/authorized', (req, res) => {
	res.send(req.user);
});

export default router;
