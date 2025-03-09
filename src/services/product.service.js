import {productRepository} from "../repository/product.repository.js";

class ProductService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAllFiltered(obj,res) {
        try {
            let { limit = 10, page = 1, sort, category, stock } = obj;
            
            if (limit < 0 || page < 0) {
                res.status(400).json("The limit and the page must be positive numbers");
            }

            const limitInt = parseInt(limit, 10) || 10;
            const pageInt = parseInt(page, 10) || 1;
            const skip = (pageInt - 1) * limitInt;

            let sortOption = {};
            if (sort === 'asc') sortOption.price = 1;
            if (sort === 'desc') sortOption.price = -1;

            const filter = {};
            if (category && category.trim() !== '') {
                filter.category = category;
            }

            if (stock !== undefined) {
                if (stock === 'true') {
                    filter.stock = { $gt: 0 };
                } else if (stock === 'false') {
                    filter.stock = { $eq: 0 };
                }
            }

            const filters = {
                filter,
                skip,
                sortOption,
                limitInt
            };

            const products = await this.repository.getAllFiltered(filters);
            const totalProducts = await this.repository.countDocuments(filter);
            const totalPages = Math.ceil(totalProducts / limitInt);

            const hasPrevPage = pageInt > 1;
            const hasNextPage = pageInt < totalPages;

            return {
                status: 'success',
                payload: products,
                totalPages,
                prevPage: hasPrevPage ? pageInt - 1 : null,
                nextPage: hasNextPage ? pageInt + 1 : null,
                page: pageInt,
                hasPrevPage,
                hasNextPage
            };
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProductById(id) {
        try {
            const response = await this.repository.getProductById(id);
            if (!response) throw new Error("Product not found");
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProduct(body) {
        try {
            const response = await this.repository.createProduct(body);
            if (!response) throw new Error("Product not created");
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProductById(id, updatedProduct){
        try {
            const response = await this.repository.updateProductById(id, updatedProduct)
            if (!response) throw new Error("Product not updated");
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProductById(id){
        try {
            const response = this.repository.deleteProductById(id)
            if (!response) throw new Error("Product not deleted");
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const productService = new ProductService(productRepository);