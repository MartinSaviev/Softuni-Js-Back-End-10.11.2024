import Devices from '../models/Devices.js';
import ObjectId from 'bson-objectid';

export async function loadDevices() {
	return await Devices.find().lean();
}

export async function create(userId, body) {
	return await Devices.create({ ...body, owner: userId });
}

export async function getOneDevice(deviceId) {
	return await Devices.findById(deviceId).lean();
}

export async function getUserDevices(userIdString) {
	const objectId = ObjectId(userIdString);

	return await Devices.find({ owner: objectId }).lean();
}

export async function preferLaptop(userId, laptopId) {
	const laptop = await Devices.findById(laptopId);
	laptop.preferredList.push(userId);
	await laptop.save();
}

export async function getPreferredLaptops(userId) {
	return await Devices.find({ preferredList: userId }).lean();
}

export async function deleteDevice(deviceId) {
	return await Devices.findByIdAndDelete(deviceId);
}

export async function updateDevice(deviceId, body) {
	return await Devices.findByIdAndUpdate(deviceId, body, {
		runValidators: true,
	}).lean();
}
