import Recipes from '../models/Recipes.js';

export async function getAllRecipes() {
	return Recipes.find({}).lean();
}
