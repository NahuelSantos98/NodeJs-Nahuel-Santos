import MongoDao from './mongo.dao.js';
import cartModel from '../models/cart.model.js';

class CartDao extends MongoDao {
    constructor() {
        super(cartModel);
    }

    async getAllCarts() {
        try {
            return await this.model.find();
        } catch (e) {
            throw new Error("Error retrieving carts");
        }
    }

    async createCart(body) {
        try {
            return await this.model.create(body);
        } catch (e) {
            throw new Error("Error creating cart");
        }
    }

    async createCartForRegister() {
        try {
            return await this.model.create({ products: [] });
        } catch (e) {
            throw new Error("Error creating cart");
        }
    }

    async getCartByIdPopulated(cartId) {
        try {
            return await this.model.findOne({ _id: cartId });
        } catch (e) {
            throw new Error("Error retrieving cart by id");
        }
    }

    async getCartById(cartId){
        try {
            return await this.model.findById(cartId);
        } catch (error) {
            throw new Error("Error retrieving cart by id");
        }
    }

    async saveCart(cart) {
        try {
            return await cart.save();
        } catch (e) {
            throw new Error("Error saving product to cart");
        }
    }

}

export const cartDao = new CartDao();
