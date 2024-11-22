import { Router } from 'express';
import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import createPlanetsController from '../controllers/createPlanetsController.js';
import catalogPlanetsController from '../controllers/catalogPlanetsController.js';
import searchController from '../controllers/searchController.js';
import detailsController from '../controllers/detailsController.js';

const router = Router();
router.use(homeController);
router.use(authController);
router.use(createPlanetsController);
router.use(catalogPlanetsController);
router.use(searchController);
router.use(detailsController);
//import controllers

router.get('*', (req, res) => {
	res.render('404', { title: '404 Not Found' });
});

export default router;
