import MainModel from '../models/MainModel.js';

function details(detailsId) {
	try {
		return MainModel.findById(detailsId).lean();
	} catch (err) {
		throw err;
	}
}

function updateDetails(detailsId, data) {
	try {
		return MainModel.findByIdAndUpdate(detailsId, data, {
			runValidators: true,
		}).lean();
	} catch (err) {
		throw err;
	}
}

function deleteDetails(detailsId) {
	try {
		return MainModel.findByIdAndDelete(detailsId).lean();
	} catch (err) {
		throw err;
	}
}

async function vote(userId, detailsId) {
	const vote = await MainModel.findById(detailsId);
	vote.voteList.push(userId);

	return vote.save();
}

export default {
	details,
	updateDetails,
	deleteDetails,
	vote,
};
