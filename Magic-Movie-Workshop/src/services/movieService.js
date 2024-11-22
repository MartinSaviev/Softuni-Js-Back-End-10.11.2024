import Films from '../models/Films.js';

async function getAllMoviesFromServer() {
	const films = await Films.find().lean();
	return films;
}

function getMovieById(id) {
	return Films.findById(id).lean();
}

function createMovie(movie, ownerId) {
	return Films.create({ ...movie, owner: ownerId });
}

function searchMovie(data) {
	if (data.title) {
		return Films.find({ title: new RegExp(data.title, 'i') }).lean();
	}
	if (data.genre) {
		return Films.find({ genre: new RegExp(data.genre, 'i') }).lean();
	}
	if (data.year) {
		return Films.find({ year: data.year }).lean();
	} else {
		return Films.find().lean();
	}
}

function deleteMovie(id) {
	return Films.findByIdAndDelete(id);
}

function editMovie(movie, movieData) {
	return Films.findByIdAndUpdate(movie, movieData);
}

export default {
	getAllMoviesFromServer,
	getMovieById,
	createMovie,
	searchMovie,
	deleteMovie,
	editMovie,
};
