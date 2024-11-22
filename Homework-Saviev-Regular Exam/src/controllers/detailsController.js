import { Router } from 'express';
import { deletePlanet, editPlanet, like, planetDetails } from '../services/detailsService.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { selectedType, selectedYesOrNo } from '../utils/selectedType.js';
import { getErrorMessage } from '../utils/errUtils.js';

const router = Router();

router.get('/details/:id', async (req, res) => {
    const planetId = req.params.id;
    const user = req.user?._id;
    const planet = await planetDetails(planetId);
    const checkIfIdExists = planet.likedList.some(userId => userId.toString() === user);
    
    try {
        const isCreator = planet.owner.toString() === user;
        res.render('details', { title: 'Planet Details', planet, user, isCreator,checkIfIdExists });
        
    } catch (error) {
        return res.render('details', { title: 'Planet Details', planet, user, isCreator,checkIfIdExists });
    }

});

router.get('/details/:id/delete', checkOwner, isAuth, async (req, res) => {
	const planetId = req.params.id;
	await deletePlanet(planetId);
	res.redirect('/catalog');
});

router.get('/details/:id/edit', checkOwner, isAuth, async (req, res) => {
	const planetId = req.params.id;
	const planet = await planetDetails(planetId);

	const typeRings = selectedYesOrNo(planet.rings);
	const typeSelected = selectedType(planet.type);

	res.render('edit', { title: 'Edit Planet', planet, typeSelected, typeRings });
});

router.post('/details/:id/edit', checkOwner, isAuth, async (req, res) => {
	const planetBody = req.body;
	const planetId = req.params.id;
    const planet = await planetDetails(planetId);
	try {
		await editPlanet(planetId, planetBody);
	} catch (err) {
		const typeRings = selectedYesOrNo(planet.rings);
		const typeSelected = selectedType(planet.type);
		const error = getErrorMessage(err);
		return res.render('edit', {
			title: 'Edit Planet',
			planet: planetBody,
			error,
            typeRings,
            typeSelected
		});
	}
	res.redirect(`/details/${planetId}`);
});

router.get('/details/:id/like', isAuth,checkIsNotOwner, async (req, res) => {
    
    const planetId = req.params.id;
    const userId = req.user?._id;
    try {
        await like(userId,planetId);
        
    } catch (error) {
        
        res.redirect(`/details/${planetId}`);
    }
    res.redirect(`/details/${planetId}`);
})

async function checkOwner(req, res, next) {
	const id = req.params.id;
	const userId = req.user?._id;
	const planet = await planetDetails(id);

	if (planet.owner.toString() == userId) {
		next();
	} else {
		res.redirect(`/details/${id}`);
	}
}

async function checkIsNotOwner(req, res, next) {
	const id = req.params.id;
	const userId = req.user?._id;
	const planet = await planetDetails(id);
	if (planet.owner.toString() == userId) {
        res.redirect(`/details/${id}`);
	} else {
       
		next();
	}
}

export default router;
