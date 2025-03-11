import { Router } from 'express';
import { userController } from '../../controllers/user.controller.js';
import { passportCall } from '../../middlewares/passportCall.middleware.js';

const userRouter = Router();

userRouter.post('/register', userController.registerStrategyLocal);

userRouter.post('/login',userController.login);

userRouter.get('/current', passportCall('jwt') ,userController.validationUserWithInfo) //Se puede como user, no debería


userRouter.get('*', (req, res)=>{
    res.status(404).json({status: 'error', message: 'No request for this endpoint for User'})
})


export default userRouter;
