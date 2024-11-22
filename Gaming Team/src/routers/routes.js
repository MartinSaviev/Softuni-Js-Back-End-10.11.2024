import { Router } from 'express';
import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import catalogController from '../controllers/catalogController.js';
import createController from '../controllers/createController.js';
import searchController from '../controllers/searchController.js';


const router = Router();
router.use(homeController);
router.use(authController);
router.use(createController);
router.use(searchController);
router.use(catalogController);
//import controllers

router.get('*', (req, res) => {
	res.render('404', { title: '404 Page - Gaming Team' });
});

export default router;
