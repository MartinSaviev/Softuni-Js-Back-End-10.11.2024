import { Router } from 'express';
import createService from '../services/createService.js';
import { getErrorMessage } from '../utils/errUtils.js';
import { selectedType } from '../utils/selectedType.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/create', isAuth, (req, res) => {
	const typeSelected = selectedType();
	res.render('create', { title: 'Create Page', typeSelected });
});

router.post('/create', isAuth, async (req, res) => {
	const userId = req.user._id;
	const data = req.body;

	try {
		await createService.create(data, userId);
		res.redirect('/catalog');
	} catch (err) {
		const typeSelected = selectedType(data.typeVolcano);
		const error = getErrorMessage(err);
		res.render('create', { title: 'Create Page', error, typeSelected, data });
	}
});

export default router;
