import detailsController from '../services/detailsService.js';

import { Router } from 'express';
import { selectedType } from '../utils/selectedType.js';
import { getErrorMessage } from '../utils/errUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/details/:id', async (req, res) => {
	const detailsId = req.params.id;
	const userId = req.user?._id;

	const details = await detailsController.details(detailsId).lean();
	const isOwner = details.owner == userId;
	let isVoted = details.voteList?.includes(userId);
	const counter =
		details.voteList?.length === undefined ? 0 : details.voteList.length;

	if (isVoted === undefined) {
		isVoted = true;
	} else {
		isVoted = false;
	}

	res.render('details', {
		title: 'Details Page',
		details,
		isOwner,
		isVoted,
		counter,
	});
});

router.get('/details/:id/edit', async (req, res) => {
	const detailsId = req.params.id;

	const details = await detailsController.details(detailsId);

	const typeSelected = selectedType(details.typeVolcano);

	res.render('edit', { title: 'Edit Page', details, typeSelected });
});

router.post('/details/:id/edit', async (req, res) => {
	const data = req.body;
	const detailsId = req.params.id;
	try {
		await detailsController.updateDetails(detailsId, data);
		res.redirect(`/details/${detailsId}`);
	} catch (err) {
		const error = getErrorMessage(err);
		const details = await detailsController.details(detailsId);
		const typeSelected = selectedType(details.typeVolcano);
		res.render('edit', { title: 'Edit Page', details, typeSelected, error });
	}

});

router.get('/details/:id/delete', async (req, res) => {
	const detailsId = req.params.id;

	await detailsController.deleteDetails(detailsId);

	res.redirect('/catalog');
});

router.get('/details/:id/vote', isAuth, async (req, res) => {
	const detailsId = req.params.id;
	const userId = req.user._id;

	try {
		await detailsController.vote(userId, detailsId);
	} catch (error) {
		throw error;
	}

	res.redirect(`/details/${detailsId}`);
});

export default router;
