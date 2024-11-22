import { Router } from 'express';
import movieService from '../services/movieService.js';

const router = new Router();

router.get('/logout', (req, res) => {
	res.clearCookie('auth');
	res.redirect('/');
});

router.get('/movies/:id/delete', async (req, res) => {
	const movieId = req.params.id;

	await movieService.deleteMovie(movieId);
	res.redirect('/');
});

export default router;
