import Game from '../models/DataBase.js';

export async function getGame(gameId) {
	const game = await Game.findById(gameId).lean();
	return game;
}

export async function ownerNotReachToBuy(req, res, next) {
	const gameId = req.params.id;
	const userId = req.user._id;

	const userGame = await Game.findById(gameId).lean();
	const ownerId = userGame.owner;

	if (ownerId == userId) {
		return res.redirect('/catalog');
	}
	next();
}

export async function checkIfUserBuy(req, res, next) {
	const userId = req.user._id;
	const gameId = req.params.id;

	const game = await Game.findById(gameId);
	
	const userGame = (game.boughtBy || []).some((buyId) => {
		return buyId == userId;
	});
	if (userGame) {
		return res.redirect(`/catalog/details/${gameId}`);
	}
	next();
}

export async function checkBuyGame(userId, gameId) {

	const game = await Game.findById(gameId);
	const userGame = (game.boughtBy || []).some((buyId) => {
		return buyId == userId ;
	});
	if (userGame) {
		return userGame;
	}

	return false;
}

export async function buyGames(userId, gameId) {
	const game = await Game.findById(gameId);
	game.boughtBy.push(userId);
	await game.save();
}

export async function editGames(gameId,body) {
	const game = await Game.findByIdAndUpdate(gameId,body,{runValidators:true}).lean();
    return game;
}