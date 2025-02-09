import { Router } from "express";
import {__dirname} from '../path.js'
import {cartController} from "../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.post('/', cartController.createCart)

cartRouter.get('/:cid', cartController.getCartById)

cartRouter.get('/', cartController.getAllCarts)

cartRouter.post('/:cid/product/:pid', cartController.addProductToCart);

cartRouter.put('/:cid', cartController.updateProductsCart)

cartRouter.put('/:cid/product/:pid', cartController.modifyQuantity)

cartRouter.delete('/:cid/product/:pid', cartController.removeProductFromCart)

cartRouter.delete('/:cid', cartController.removeAllProductsFromCart)


export default cartRouter;