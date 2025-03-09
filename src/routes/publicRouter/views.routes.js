import { Router } from "express";
import { __dirname } from "../../path.js";
import { renderProducts, renderProductDetail } from "../../controllers/product.controller.js";
import { renderCart } from "../../controllers/cart.controller.js";

const viewsRouter = Router();

viewsRouter.get('/products', renderProducts)

viewsRouter.get('/products/:pid', renderProductDetail)

viewsRouter.get('/carts/:cid', renderCart)


export default viewsRouter;
