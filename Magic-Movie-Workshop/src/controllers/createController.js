import { Router } from 'express';
import movieService from '../services/movieService.js';

const router = Router();

router.get('/create', (req, res) => {
	res.render('create',{title:'Create'});
});

router.post('/create', (req, res) => {
	const ownerId = req.user?._id;
	movieService.createMovie(req.body, ownerId);

	res.redirect('/');
});

export default router;
