import { Router } from "express";
import {  productController } from "../../controllers/product.controller.js";
import { validateProduct, validateUpdateProduct } from "../../middlewares/productValidator.js";
import {roleAuth} from '../../middlewares/roleAuth.middleware.js'
import { passportCall } from "../../middlewares/passportCall.middleware.js";

const productRouter = Router();

productRouter.route('/')
    .get( productController.getAllFiltered)
    .post(passportCall('jwt'), [validateProduct()], roleAuth(['ADMIN']), productController.createProduct)

productRouter.route('/:pid')
    .get( productController.getProductById)
    .put(passportCall('jwt'), [validateUpdateProduct()], roleAuth(['ADMIN']), productController.updateProductById)
    .delete(passportCall('jwt'), roleAuth(['ADMIN']), productController.deleteProductById)

    productRouter.param('pid', (req, res, next, pid)=>{
        if(pid) return next()
        return res.status(400).json({status: "Error",message: "Invalid id"})
    })

productRouter.get('*', (req, res)=>{
    res.status(404).json({status: 'error', message: 'No request for this endpoint for Product'})
})


export default productRouter;
