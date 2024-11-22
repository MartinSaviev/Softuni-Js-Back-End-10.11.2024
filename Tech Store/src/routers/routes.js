import { Router } from 'express';
import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import techStore from '../controllers/techController.js';
import errorController from '../controllers/errorController.js';

const router = Router();
router.use(homeController);
router.use(authController);
router.use(techStore);
router.get('/about', (req, res) => {
	res.render('about', { title: 'TechStore - About Us' });
});
//404
router.use(errorController);

//import controllers

export default router;
