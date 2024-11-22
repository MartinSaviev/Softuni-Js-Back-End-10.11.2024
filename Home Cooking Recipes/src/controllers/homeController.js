import { Router } from 'express';
import { getAllRecipes } from '../services/homeService.js';

const router = Router();
router.get('/', async (req, res) => {
	const allRecipes = await getAllRecipes();
	const lastThreeRecipes = allRecipes.slice(-3);
	res.render('home', { title: 'Home Cooking Recipes', threeRecipes:lastThreeRecipes});
});

export default router;
