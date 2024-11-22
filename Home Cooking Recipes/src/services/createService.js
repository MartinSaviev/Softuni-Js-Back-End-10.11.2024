import Recipes from '../models/Recipes.js';

export async function createRecipes(data, userId) {
	return await Recipes.create({ ...data, owner: userId });
}

