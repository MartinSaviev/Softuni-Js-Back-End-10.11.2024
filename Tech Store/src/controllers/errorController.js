import { Router } from 'express';

const router = Router();



router.get('*', (req, res) => {
	res.render('404', { title: 'echStore - Page Not Found' });
});

export default router;
