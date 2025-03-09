import productModel from "../models/product.model.js";
import MongoDao from "./mongo.dao.js";

class ProductDao extends MongoDao {
    constructor() {
        super(productModel); // Usa el modelo de productos
    }

    async getAllFiltered(obj) {
        try {
            return await super.getAllFiltered(obj);
        } catch (e) {
            throw new Error(e);
        }
    }

    async countDocuments(obj) {
        try {
            return await super.countDocuments(obj);
        } catch (e) {
            throw new Error(e);
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error("Error while obtaining the product from de database");
        }
    }
    

    async createProduct(obj) {
        try {
            const result = await this.model.create(obj);
            if (!result) {
                throw new Error("Failed to create product: No response from DB");
            }
            return result;
        } catch (error) {
            console.error("Error in DAO: ", error.message);
            throw new Error(`Error while creating the product: ${error.message}`);
        }
    }


    async updateProductById(id, obj) {
        try {
            return await this.model.findByIdAndUpdate(id, obj, { new: true })
        } catch (error) {
            throw new Error("Error while updating the product");
        }
    }

    async deleteProductById(id) {
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            throw new Error("Error while deleting the product");

        }
    }

}

export const productDao = new ProductDao();
