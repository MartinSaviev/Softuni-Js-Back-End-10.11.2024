import { Router } from 'express';
import { create } from '../services/createService.js';
import { getErrorMessage } from '../utils/errUtils.js';

const router = Router();

router.get('/create', async (req, res) => {
	const typeGame = platformType();
	res.render('create', { title: 'Create Page - Gaming Team', typeGame });
});
router.post('/create', async (req, res) => {
	const body = req.body;
	const userId = req.user._id;
	try {
		await create(body, userId);
		res.redirect('/catalog');
	} catch (err) {
		const error = getErrorMessage(err);

		const typeGame = platformType(body.platform);

		return res.render('create', {
			title: 'Create Page - Gaming Team',
			error,
			game: body,
			typeGame,
		});
	}
});

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
