import { Router } from 'express';
import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import createController from '../controllers/createController.js';
import catalogController from '../controllers/catalogController.js';
import detailsController from '../controllers/detailsController.js';

const router = Router();
router.use(homeController);
router.use(authController);
router.use(createController);
router.use(catalogController);
router.use(detailsController);

router.get('*', (req, res) => {
	res.render('404', { title: '404 Not Found' });
});

//import controllers

export default router;
