import { Router } from 'express';
import dashboardService from '../services/dashboardService.js';
import homeService from '../services/homeService.js';
import { getErrorMessage } from '../utils/errUtils.js';

const router = Router();

router.get('/dashboard', async (req, res) => {
	const allStones = await homeService.load();
	res.render('dashboard', { title: 'Dashboard Page', allStones });
});

router.get('/dashboard/details/:id', async (req, res) => {
	const stoneId = req.params.id;
	const userId = req.user._id;

	const stone = await dashboardService.minerals(stoneId);
	const myId = stone.likedList?.includes(stone.owner);
	console.log(myId);
	let isLiked = false;
	let isOwner = false;

	if (stone.owner == userId) {
		isOwner = true;
	}

	if (myId === undefined) {
		isLiked = true;
	}

	res.render('details', { title: 'Details Page', stone, isOwner, isLiked });
});

router.get('/dashboard/details/:id/edit', async (req, res) => {
	const stoneId = req.params.id;
	const stone = await dashboardService.minerals(stoneId);
	res.render('edit', { title: 'Edit Page', stone });
});

router.post('/dashboard/details/:id/edit', async (req, res) => {
	const stoneId = req.params.id;
	const oldData = await dashboardService.minerals(stoneId);
	const body = req.body;
	try {
		await dashboardService.update(stoneId, body);
		res.redirect(`/dashboard/details/${stoneId}`);
	} catch (err) {
		const error = getErrorMessage(err);
		res.render('edit', { title: 'Edit Page', stone: oldData, error });
	}
});

router.get('/dashboard/details/:id/delete', async (req, res) => {
	const stoneId = req.params.id;
	try {
		await dashboardService.deleteStone(stoneId);
		res.redirect('/dashboard');
	} catch (err) {
		const error = getErrorMessage(err);
		res.render('details', { title: 'Details Page', stone: null, error });
	}
});

router.get('/dashboard/details/:id/vote', async (req, res) => {
	const stoneId = req.params.id;
	const userId = req.user._id;
	try {
		await dashboardService.voteStone(stoneId, userId);
		res.redirect('/dashboard');
	} catch (err) {
		const error = getErrorMessage(err);
		res.render('details', { title: 'Details Page', stone: null, error });
	}
});

export default router;
