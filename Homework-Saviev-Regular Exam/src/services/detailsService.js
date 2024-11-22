import Planets from '../models/DataBase.js';

export async function planetDetails(planetId) {
	return Planets.findById(planetId).lean();
}

export async function deletePlanet(planetId) {

	return await Planets.findByIdAndDelete(planetId);
}

export async function editPlanet(planetId, updatedPlanet) {
    return await Planets.findByIdAndUpdate(planetId, updatedPlanet, {runValidators: true}).lean();
}

export async function like(userId, planetId) {
	const like = await Planets.findById(planetId);
	like.likedList.push(userId);
	return like.save();
}