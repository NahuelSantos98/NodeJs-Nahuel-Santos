import { productDao } from "../dao/product.dao.js";
import ProductOutputDTO from "../dto/output/product.output.dto.js";
import ProductInputDto from '../dto/input/product.input.dto.js'

class ProductRepository{
    constructor(dao){
        this.dao = dao
    }

    async getAllFiltered(filters){
        try {
            const response = await this.dao.getAllFiltered(filters)
            return response.map(product => new ProductOutputDTO(product));
        } catch (e) {
            throw new Error(e)
        }
    }

    async countDocuments(obj){
        try {
            return await this.dao.countDocuments(obj);
        } catch (e) {
            throw new Error(e);
        }
    }

    async getProductByIdPlain(id) {
        try {
            const response = await this.dao.getById(id); 
            return response
        } catch (e) {
            throw new Error(e);
        }
    }

    async getProductById(id) {
        try {
            const response = await this.dao.getById(id); 
            return new ProductOutputDTO(response); 
        } catch (e) {
            throw new Error(e);
        }
    }

    async createProduct(body) {
        try {
            const prodDto = new ProductInputDto(body)
            const response = await this.dao.createProduct(prodDto);
            return new ProductOutputDTO(response);
        } catch (e) {
            throw new Error(e);
        }
    }

    async updateProductById(id, updatedProduct){
        try {
            const prodDto = new ProductInputDto(updatedProduct)
            const response = await this.dao.updateProductById(id, prodDto)
            return new ProductOutputDTO(response)
        } catch (e) {
            throw new Error(e);
        }
    }

    async deleteProductById(id){
        try {
            const response = this.dao.deleteProductById(id)
            return new ProductOutputDTO(response)
        } catch (e) {
            throw new Error(e);
        }
    }
}

export const productRepository = new ProductRepository(productDao)