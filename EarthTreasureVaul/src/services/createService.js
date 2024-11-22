import Stones from '../models/Stones.js';

async function create(data,userId) {
	try {
		return  await Stones.create({ ...data, owner: userId });
	} catch (err) {
		throw err;
	}
}

export default {
	create,
};
