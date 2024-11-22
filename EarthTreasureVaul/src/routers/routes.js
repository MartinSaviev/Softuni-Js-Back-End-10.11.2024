import { Router } from 'express';
import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import createController from '../controllers/createController.js';
import dashboardController from '../controllers/dashboardController.js';
const router = Router();

router.use(homeController);
router.use(authController);
router.use(createController);
router.use(dashboardController);

router.get('*', (req, res) => {
	res.render('404', { title: '404 Not Found' });
});

//import controllers

export default router;
