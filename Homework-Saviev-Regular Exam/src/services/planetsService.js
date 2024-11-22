import Planets from '../models/DataBase.js';

export async function createPlanets(body, userId) {
	try {
		return await Planets.create({ ...body, owner: userId });
	} catch (error) {
		throw error;
	}
}

export async function getAllPlanets() {
	try {
		return Planets.find({}).lean();
	} catch (error) {
		throw error;
	}
}
