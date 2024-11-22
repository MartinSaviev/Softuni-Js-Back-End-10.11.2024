import { Router } from 'express';

const router = Router();

router.get('/search', (req, res) => {
	res.render('search', { title: 'Search - Gaming Team' });
});

export default router;
