import Game from '../models/DataBase.js';

Game;
export async function create(body, userId) {
	return await Game.create({ ...body, owner: userId });
}
