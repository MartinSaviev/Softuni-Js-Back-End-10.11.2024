import { Router } from 'express';
import {
	create,
	deleteDevice,
	getOneDevice,
	getPreferredLaptops,
	getUserDevices,
	loadDevices,
	preferLaptop,
	updateDevice,
} from '../services/techStoreService.js';
import { getErrorMessage } from '../utils/errUtils.js';
import { isAuth, isGuest } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/create', (req, res) => {
	res.render('create', { title: 'TechStore - Create Product' });
});

router.post('/create', async (req, res) => {
	const userId = req.user._id;
	const body = req.body;
	try {
		await create(userId, body);
	} catch (err) {
		const error = getErrorMessage(err);
		return res.render('create', {
			title: 'TechStore - Create Product',
			body,
			error,
		});
	}
	res.redirect('/');
});

router.get('/catalog', async (req, res) => {
	const allDevices = await loadDevices();
	res.render('catalog', { title: 'TechStore - Product Catalog', allDevices });
});

router.get('/profile', async (req, res) => {
	const userId = req.user._id;
	const userDevices = await getUserDevices(userId);
	const preferLaptops = await getPreferredLaptops(userId);

	res.render('profile', {
		title: 'TechStore - Profile',
		userDevices,
		preferLaptops,
	});
});

router.get('/details/:id', async (req, res) => {
	const userId = req.user?._id;
	const deviceId = req.params.id;

	try {
		const device = await getOneDevice(deviceId);
		const isOwner = device.owner == userId ? true : false;
		const isPrefer = device.preferredList.some(
			(preferId) => preferId == userId
		);
		res.render('details', {
			title: 'TechStore - Product Details',
			device,
			userId,
			isOwner,
			isPrefer,
		});
	} catch (err) {
		console.error(err);
	}
});

router.get('/catalog/details/:id/prefer', isAuth, async (req, res) => {
	const userId = req.user._id;
	const laptopId = req.params.id;
	await preferLaptop(userId, laptopId);
	res.redirect('/catalog');
});

router.get('/catalog/details/:id/delete', isAuth, async (req, res) => {
	const deviceId = req.params.id;
	await deleteDevice(deviceId);
	res.redirect('/catalog');
});

router.get('/catalog/details/:id/edit', isAuth, async (req, res) => {
	const deviceId = req.params.id;
	const device = await getOneDevice(deviceId);
	res.render('edit', { title: 'TechStore - Edit Product', device });
});

router.post('/catalog/details/:id/edit', isAuth, async (req, res) => {
	const deviceId = req.params.id;
	const body = req.body;

	try {
		await updateDevice(deviceId, body);
		res.redirect('/catalog');
	} catch (err) {
		const device = await getOneDevice(deviceId);
		const error = getErrorMessage(err);
		return res.render('edit', {
			title: 'TechStore - Edit Product',
			device,
			error,
		});
	}
});

export default router;
