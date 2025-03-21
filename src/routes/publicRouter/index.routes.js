import { Router } from 'express';

import productRouter from './producto.routes.js';
import cartRouter from './cart.routes.js';
import viewsRouter from './views.routes.js';
import userRouter from './user.routes.js';
import emailRouter from './email.routes.js'
import ticketRouter from './ticket.routes.js';

const router = Router()

router.use('/products', productRouter);
router.use('/carts', cartRouter);
router.use('/views',viewsRouter);
router.use('/user', userRouter)
router.use('/email', emailRouter)
router.use('/ticket', ticketRouter)

export default router