import Stones from '../models/Stones.js';
async function minerals(_id) {
	try {
		return await Stones.findById({ _id }).lean();
	} catch (error) {
		throw error;
	}
}

async function update(id, body) {
	try {
		return await Stones.findByIdAndUpdate(id, body, {
			runValidators: true,
		}).lean();
	} catch (error) {
		throw error;
	}
}

async function deleteStone(id) {
	try {
		await Stones.findByIdAndDelete(id);
	} catch (error) {
		throw error;
	}
}

function voteStone(id,userId) {
	try {
		return Stones.findByIdAndUpdate(id, { $push: { likedList: userId } });
	} catch (error) {
        throw error;
    }
}
export default {
	minerals,
	update,
	deleteStone,
	voteStone,
};
