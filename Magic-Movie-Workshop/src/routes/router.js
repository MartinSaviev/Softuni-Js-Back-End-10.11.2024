import homeController from '../controllers/homeController.js';
import createController from '../controllers/createController.js';
import searchController from '../controllers/searchController.js';
import createCastController from '../controllers/createCastController.js';
import castAttachController from '../controllers/castAttachController.js';
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';
import logoutAndDeleteController from '../controllers/logoutAndDeleteController.js';

import { Router } from 'express';
const router = Router();

router.use(homeController);
router.use(createController);
router.use(searchController);
router.use(createCastController);
router.use(castAttachController);
router.use(registerController);
router.use(loginController);
router.use(logoutAndDeleteController);
router.get('/about', (req, res) => {
	res.render('about',{title: 'About'});
});

router.get('*', (req, res) => {
	res.render('404',{title:'404 Page'});
});

export default router;
