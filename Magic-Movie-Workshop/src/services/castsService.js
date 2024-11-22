import Casts from '../models/Casts.js';

function createCasts(body) {
	const casts = Casts.create(body);
	return casts;
}

export default {
	createCasts,
};
