import { Router } from 'express';
import { getAllPlanets } from '../services/planetsService.js';

const router = Router();

router.get('/catalog', async(req, res) => {

	const allPlanets = await getAllPlanets();

	res.render('catalog', { title: 'Planet Catalogue' ,allPlanets});
});

export default router;
