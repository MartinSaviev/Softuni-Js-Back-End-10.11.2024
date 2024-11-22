import { Router } from 'express';
import movieService from '../services/movieService.js';

const router = Router();

router.get('/', async (req, res) => {
	const allMovies = await movieService.getAllMoviesFromServer();
	res.render('home', { allMovies,title:'Home' });
});

router.get('/details/:id', async (req, res) => {
	const movieId = req.params.id;
	const movie = await movieService.getMovieById(movieId);
	const isOwner = req.user?._id == movie.owner;
	res.render('details', { movie, isOwner,title:'Details' });
});

router.get('/movies/:id/edit', async (req, res) => {
	const movieId = req.params.id;
	const movie = await movieService.getMovieById(movieId);
	res.render('edit', { movie,title:'Edit'});
});
router.post('/movies/:id/edit', async (req, res) => {
	const movieData = req.body;
	const movieId = req.params.id;
	await movieService.editMovie(movieId, movieData);
	res.redirect('/');
});

export default router;
