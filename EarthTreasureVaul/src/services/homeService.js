import Stones from '../models/Stones.js';

async function load() {
	try {
		return await Stones.find().lean();
	} catch (error) {
		throw error;
	}
}

export default {
	load,
};
