import Game from '../models/DataBase.js';
export async function del(userId) {
	return Game.findByIdAndDelete(userId).lean();
}
