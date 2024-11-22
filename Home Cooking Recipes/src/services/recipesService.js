import Recipes from '../models/Recipes.js';

export async function getRecipeById(recipeId) {
	return await Recipes.findById(recipeId).lean();
}

export async function addRecommend(userId, recipeId) {
	const recipe = await Recipes.findById(recipeId);

	recipe.recommendList.push(userId);
	await recipe.save();
}

export async function updateRecipe(recipeId, body) {
	try {
		return await Recipes.findByIdAndUpdate(recipeId, body, {
			runValidators: true,
		}).lean();
	} catch (error) {
		throw error;
	}
}

export async function deleteRecipe(recipeId) {
    return await Recipes.findByIdAndDelete(recipeId);
}
