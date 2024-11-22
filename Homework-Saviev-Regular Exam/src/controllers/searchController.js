import { Router } from 'express';
import { loadAllPlanets, searchPlanet } from '../services/searchService.js';

const router = Router();

router.get('/search', async (req, res) => {

	try {
		const allPlanets = await loadAllPlanets();
		res.render('search', {
			title: 'Planet Search',
			allPlanets,
		});
	} catch (error) {
        
        return res.render('search', { title: 'Planet Search' });
    }
});

router.post('/search', async (req, res) => {
	const data = req.body;
	const planets = await searchPlanet(data);
	res.render('search', {
		title: 'Planet Search',
		allPlanets: planets,
	});
});

export default router;
