import { Router } from 'express';
import { loadDevices } from '../services/techStoreService.js';

const router = Router();
router.get('/', async (req, res) => {
	const allDevices = await loadDevices();
	const lastThreeDevices = allDevices.slice(-3);
	res.render('home', {
		title: 'TechStore - Laptops and Computers',
		allDevices:lastThreeDevices,
	});
});

export default router;
