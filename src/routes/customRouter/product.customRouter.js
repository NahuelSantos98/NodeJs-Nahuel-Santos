import { productController } from "../../controllers/product.controller.js";
import Router from "./class.customRouter.js";

export default class ProductCustomRouter extends Router{
    init(){
        this.get('/', ['PUBLIC'], productController.getAllFiltered)
        this.post('/', ['ADMIN'], productController.createProduct)

        this.get('/:pid', ['PUBLIC'], productController.getProductById)
        this.put('/:pid', ['ADMIN'], productController.updateProductById)
        this.delete('/:pid', ['ADMIN'], productController.deleteProductById)
        
        this.get('*', (req, res)=>{
            res.status(404).json({status: 'error', message: 'No request for this endpoint for Product'})
        })
    }
}

export const productCustomRouter = new ProductCustomRouter()