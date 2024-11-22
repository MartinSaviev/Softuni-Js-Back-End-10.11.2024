import { Router } from 'express';
import { getAllRecipes } from '../services/homeService.js';
import {
	addRecommend,
	deleteRecipe,
	getRecipeById,
	updateRecipe,
} from '../services/recipesService.js';
import { getErrorMessage } from '../utils/errUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/recipes', async (req, res) => {
	const allRecipes = await getAllRecipes();

	res.render('recipes', {
		title: 'Recipe Catalog - Home Cooking Recipes',
		allRecipes,
	});
});

router.get('/recipes/:id/details', async (req, res) => {
	const recipeId = req.params.id;
	const userId = req.user?._id;
	try {
		const recipe = await getRecipeById(recipeId);
        
		const isOwner = recipe.owner.equals(userId);

		const isLike = recipe.recommendList?.some((recommend) =>
			recommend.equals(userId)
		);

		const recommend = recipe.recommendList.length || 0;

		res.render('details', {
			title: `${recipe.title} - Home Cooking Recipes`,
			recipe,
			isOwner,
			isLike,
			recommend,
			userId,
		});
	} catch (error) {
		const recipe = await getRecipeById(recipeId);
		res.render('details', {
			title: `${recipe.title} - Home Cooking Recipes`,
			recipe,
			userId,
		});
	}
});

router.get('/recipes/:id/details/recommend', isAuth,checkIsOwner, async (req, res) => {

	const recipeId = req.params.id;
	const userId = req.user._id;
	const recipe = await getRecipeById(recipeId);
	const isLike = recipe.recommendList.some((recommend) => recommend.toString() === userId);

	if (isLike) {
        return res.redirect(`/recipes/${recipeId}/details`);
    }

	try {
		await addRecommend(userId, recipeId);
		res.redirect(`/recipes/${recipeId}/details`);
	} catch (error) {
		res.redirect('404');
		return;
	}
});

router.get('/recipes/:id/details/edit', isAuth,checkIsNotOwner, async (req, res) => {
	const recipeId = req.params.id;
	const recipe = await getRecipeById(recipeId);
	res.render('edit', { title: 'Edit Recipe - Home Cooking Recipes', recipe });
});

router.post('/recipes/:id/details/edit', isAuth,checkIsNotOwner, async (req, res) => {

	const recipeId = req.params.id;
	try {
		await updateRecipe(recipeId, req.body);
		res.redirect(`/recipes/${recipeId}/details`);
	} catch (err) {
		const error = getErrorMessage(err);

		res.render('edit', {
			title: 'Edit Recipe - Home Cooking Recipes',
			recipe: req.body,
			error,
		});
	}
});

router.get('/recipes/:id/details/delete', isAuth, checkIsNotOwner, async (req, res) => {

	const recipeId = req.params.id;
	
	await deleteRecipe(recipeId);
	res.redirect('/recipes');
});

async function checkIsOwner(req, res, next) {
	const recipeId = req.params.id;
	const userId = req.user._id;

	const recipe = await getRecipeById(recipeId);
	const isOwner = recipe.owner.equals(userId);
	
	if (isOwner) {
		return res.redirect(`/recipes/${recipeId}/details`);
	}
	next();
	
}

async function checkIsNotOwner(req, res, next) {
	const recipeId = req.params.id;
	const userId = req.user._id;

	const recipe = await getRecipeById(recipeId);
	const isOwner = recipe.owner.equals(userId);
	
	if (!isOwner) {
		return res.redirect(`/recipes/${recipeId}/details`);
	}
	next();
	
}


export default router;
