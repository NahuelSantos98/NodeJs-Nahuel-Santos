import { Router } from "express";
import {  productController } from "../controllers/product.controller.js";

const productRouter = Router();


productRouter.get('/', productController.getAllFiltered);

productRouter.get('/:pid', productController.getProductById)

productRouter.post('/', productController.createProduct)

productRouter.put('/:pid', productController.updateProductById)

productRouter.delete('/:pid', productController.deleteProductById)

export default productRouter;
