import Recipes from '../models/Recipes.js';

export async function loadAllRecipes() {
	return await Recipes.find().lean();
}

export async function searchRecipes(data) {
	if (data.search) {
		return Recipes.find({ title: new RegExp(data.search, 'i') }).lean();
	} else {
		return await Recipes.find().lean();
	}
}
