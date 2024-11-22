import Planets from '../models/DataBase.js';

export async function loadAllPlanets() {
	return await Planets.find().lean();
}

export async function searchPlanet(data) {
	const planet = {};

	if (data.name) {
		planet.name = new RegExp(data.name, 'i'); 
	}

	if (data.solarSystem) {
		planet.solarSystem = new RegExp(data.solarSystem, 'i'); 
	}

	return await Planets.find(Object.keys(planet).length ? planet : {}).lean();
}
