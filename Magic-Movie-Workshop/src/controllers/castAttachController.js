import {Router} from 'express';

const router = Router();

router.get('/cast-attach',(req,res)=> {
    res.render('cast-attach');
});

export default router;