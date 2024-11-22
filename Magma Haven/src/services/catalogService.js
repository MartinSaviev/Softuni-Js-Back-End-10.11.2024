import MainModel from '../models/MainModel.js';

async function getAll() {
	
	return MainModel.find({}).lean();
}

export default {
	getAll,
};
