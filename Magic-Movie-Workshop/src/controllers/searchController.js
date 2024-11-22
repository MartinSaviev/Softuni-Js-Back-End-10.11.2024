import { Router } from 'express';
import movieService from '../services/movieService.js';

const router = Router();

router.get('/search', async(req, res) => {
	const movies = await movieService.searchMovie(req.query);
	res.render('search',{movies,title:'Search'});
});

export default router;
