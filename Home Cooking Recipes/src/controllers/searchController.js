import { Router } from 'express';
import { loadAllRecipes, searchRecipes } from '../services/searchService.js';

const router = Router();

router.get('/search', async (req, res) => {
	try {
		const allRecipes = await loadAllRecipes();
		res.render('search', {
			title: 'Search Recipes - Home Cooking Recipes',
			allRecipes,
		});
	} catch (error) {}
});

router.post('/search', async (req, res) => {
	const data = req.body;
	console.log(data.search);
 const recipes = await searchRecipes(data);
	res.render('search', {
		title: 'Search Recipes - Home Cooking Recipes',
		allRecipes:recipes,
	});
});

export default router;
