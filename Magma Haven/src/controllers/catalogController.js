import { Router } from 'express';
import catalogService from '../services/catalogService.js';

const router = Router();
router.get('/catalog', async (req, res) => {
	const all = await catalogService.getAll();
	const notHave = Object.keys(all).length > 0 === true;

	res.render('catalog', { title: 'Catalog Page', all, notHave });
});

export default router;
