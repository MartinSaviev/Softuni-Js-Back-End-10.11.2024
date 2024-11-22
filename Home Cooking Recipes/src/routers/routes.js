import { Router } from 'express';
import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import createController from '../controllers/createController.js';
import recipesController from '../controllers/recipesController.js';
import searchController from '../controllers/searchController.js';

const router = Router();
router.use(homeController);
router.use(authController);
router.use(createController);
router.use(recipesController);
router.use(searchController);
//import controllers

router.get('*', (req, res) => {
	res.render('404', { title: 'Page Not Found - Home Cooking Recipes' });
});


export default router;
