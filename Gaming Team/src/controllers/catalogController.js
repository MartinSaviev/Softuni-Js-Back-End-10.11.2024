import { Router } from 'express';
import { getAll } from '../services/catalogService.js';
import {
	buyGames,
	checkIfUserBuy,
	getGame,
	ownerNotReachToBuy,
	checkBuyGame,
	editGames,
} from '../services/detailsService.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { del } from '../services/deleteService.js';
import { getErrorMessage } from '../utils/errUtils.js';

const router = Router();

router.get('/catalog', async (req, res) => {
	const allGames = await getAll();
	res.render('catalog', { title: 'Catalog Page - Gaming Team', allGames });
});

router.get('/catalog/details/:id', isAuth, async (req, res) => {
	const userId = req.user._id;
	const gameId = req.params.id;
	const game = await getGame(gameId);

	const ownerId = game.owner;
	const isOwner = ownerId == userId;
	const buyGame = await checkBuyGame(userId, gameId);

	res.render('details', { title: 'Details Page', game, isOwner, buyGame });
});

router.get('/catalog/details/:id/edit', isAuth, async (req, res) => {
	const gameId = req.params.id;

	const game = await getGame(gameId);

	const typeGame = platformType(game.platform);

	return res.render('edit', {
		title: 'Edit Page - Gaming Team',
		game,
		typeGame,
	});
});

router.post('/catalog/details/:id/edit', isAuth, async (req, res) => {
	const gameId = req.params.id;
	const body = req.body;
	const game = await getGame(gameId);
	const typeGame = platformType(game.platform);
	try {
		await editGames(gameId, body);
		 res.redirect('/catalog');
	} catch (err) {
		const error = getErrorMessage(err);
		return res.render('edit', {
			title: 'Edit Page - Gaming Team',
			game,
			error,
			typeGame,
		});
	}
});

router.get('/catalog/details/:id/delete', isAuth, async (req, res) => {
	const userId = req.params.id;
	await del(userId);
	res.redirect('/catalog');
});
router.get(
	'/catalog/details/:id/buy',
	ownerNotReachToBuy,
	checkIfUserBuy,
	isAuth,
	async (req, res) => {
		const userId = req.user._id;
		const gameId = req.params.id;
		buyGames(userId, gameId);
		res.redirect(`/catalog/details/${gameId}`);
	}
);

function platformType(selectedType) {
	const types = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

	const typeSelected = types.map((type) => {
		return {
			gameType: type,
			label: type,
			selected: selectedType === type ? 'selected' : '',
		};
	});
	return typeSelected;
}

export default router;
