import { Router } from "express";
import {  productController } from "../../controllers/product.controller.js";
import { validateProduct, validateUpdateProduct } from "../../middlewares/productValidator.js";

const productRouter = Router();

(productRouter.route('/')
    .get(productController.getAllFiltered)
    .post( [validateProduct()], productController.createProduct))

productRouter.route('/:pid')
    .get(productController.getProductById)
    .put([validateUpdateProduct()],productController.updateProductById)
    .delete(productController.deleteProductById)

    productRouter.param('pid', (req, res, next, pid)=>{
        if(pid) return next()
        return res.status(400).json({status: "Error",message: "Invalid id"})
    })

productRouter.get('*', (req, res)=>{
    res.status(404).json({status: 'error', message: 'No request for this endpoint for Product'})
})


export default productRouter;
