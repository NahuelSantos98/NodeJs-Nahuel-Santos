import { Router } from "express";
import {__dirname} from '../../path.js'
import {cartController} from "../../controllers/cart.controller.js";
import { roleAuth } from "../../middlewares/roleAuth.middleware.js";
import {passportCall} from '../../middlewares/passportCall.middleware.js'

const cartRouter = Router()

cartRouter.route('/')
    .post(cartController.createCart)
    .get(passportCall('jwt'), roleAuth(['ADMIN']),cartController.getAllCarts)  //Usar passportCall para autenticar y asignar req.user

cartRouter.route('/:cid')
    .get(passportCall('jwt'), roleAuth(['USER']),cartController.getCartById)
    .put(passportCall('jwt'), roleAuth(['USER']),cartController.updateProductsCart)
    .delete(passportCall('jwt'), roleAuth(['USER']),cartController.removeAllProductsFromCart)

cartRouter.route('/:cid/product/:pid')
    .post(passportCall('jwt'), roleAuth(['USER']),cartController.addProductToCart)
    .put(passportCall('jwt'), roleAuth(['USER']),cartController.modifyQuantity)
    .delete(passportCall('jwt'), roleAuth(['USER']),cartController.removeProductFromCart)

    cartRouter.param('cid', (req, res, next, cid)=>{
        if(cid) return next()
        return res.status(400).json({status: "Error",message: "Invalid Cart id"})
    })

    cartRouter.param('pid', (req, res, next, pid)=>{
        if(pid) return next()
        return res.status(400).json({status: "Error",message: "Invalid Product id"})
    })


cartRouter.get('*', (req, res)=>{
    res.status(404).json({status: 'error', message: 'No request for this endpoint for Cart'})
})

export default cartRouter;