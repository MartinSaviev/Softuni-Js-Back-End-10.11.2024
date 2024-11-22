import MainModel from '../models/MainModel.js';

async function create(data, userId) {
	try {
		await MainModel.create({ ...data, owner: userId });
	} catch (err) {
		throw err;
	}
}

export default {
	create,
};
