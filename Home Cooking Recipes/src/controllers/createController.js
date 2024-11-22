import { Router } from 'express';
import { createRecipes } from '../services/createService.js';
import { getErrorMessage } from '../utils/errUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/addRecipes',isAuth, (req, res) => {
	res.render('create', { title: 'Create Recipe - Home Cooking Recipes' });
});

router.post('/addRecipes',isAuth, async (req, res) => {
	const data = req.body;
	const userId = req.user._id;
    console.log(data, userId);
    
	try {
		await createRecipes(data, userId);
		res.redirect('/recipes');
	} catch (err) {
		const error = getErrorMessage(err);
		res.render('create', {
			title: 'Create Recipe - Home Cooking Recipes',
			error,
			data,
		});
	}
});

export default router;
