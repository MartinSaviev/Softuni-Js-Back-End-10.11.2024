import { Router } from 'express';
import { getErrorMessage } from '../utils/errUtils.js';
import { createPlanets } from '../services/planetsService.js';
import { selectedType, selectedYesOrNo } from '../utils/selectedType.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/create', isAuth, async (req, res) => {
    const typeRings =  selectedYesOrNo()
	const typeSelected = selectedType();
		res.render('create', { title: 'Add New Planet',typeSelected,typeRings });
});

router.post('/create',isAuth, async (req, res) => {
    const body = req.body;
    const userId = req.user._id;
	try {
        const typeSelected = selectedType();
        await createPlanets(body,userId,typeSelected);
		
	} catch (err) {
		const error = getErrorMessage(err);
        const typeRings = selectedYesOrNo(body.rings);
        const typeSelected = selectedType(body.type);
		return res.render('create', { title: 'Add New Planet', error,body,typeSelected,typeRings });
	}
    res.redirect('/catalog');
});

export default router;
