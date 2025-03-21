import { cartDao } from "../dao/cart.dao.js"
import CartOutputDTO from "../dto/output/cart.output.dto.js";

class CartRepository{
    constructor(dao){
        this.dao = dao
    }

    async getAllCarts() {
        try {
            const response = await this.dao.getAllCarts();
            return response.map(cart => new CartOutputDTO(cart));
        } catch (e) {
            throw new Error(e);
        }
    }

    async createCart(cart) {
        try {
            const response = await this.dao.createCart(cart);
            return new CartOutputDTO(response);
        } catch (e) {
            throw new Error(e);
        }
    }

    async createCartForRegister(){
        try {
            const response = await this.dao.createCartForRegister();
            return new CartOutputDTO(response);
        } catch (e) {
            throw new Error(e);
        }
    }

    async getCartById(cartId) {
        try {
            const response = await this.dao.getCartByIdPopulated(cartId);
            return new CartOutputDTO(response);
        } catch (e) {
            throw new Error(e);
        }
    }

    async findCart(cartId) {
        try {
            const response = await this.dao.getCartById(cartId);
            return response;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getCartByIdPopulated(cartId) {
        try {
            const response = await this.dao.getCartByIdPopulated(cartId);
            return new CartOutputDTO(response);
        } catch (e) {
            throw new Error(e);
        }
    }

    async addProductToCart(cart) {
        try {
            const response = await this.dao.saveCart(cart);
            return new CartOutputDTO(response);
        } catch (e) {
            throw new Error("Error adding product to cart", e);
        }
    }
    

    async updateProductsCart(cart) {
        try {
            const response = await this.dao.saveCart(cart);
            return new CartOutputDTO(response);
        } catch (e) {
            throw new Error("Error updating products in cart", e);
        }
    }

    async modifyQuantity(cart) {
        try {
            const response = await this.dao.saveCart(cart);
            return new CartOutputDTO(response);
        } catch (e) {
            throw new Error("Error modifying product quantity in cart", e);
        }
    }

    async removeProductFromCart() {
        try {
            const response = await this.dao.saveCart(cart)
            return new CartOutputDTO(response)
        } catch (e) {
            throw new Error("Error removing product from cart", e);
        }
    }

    async removeAllProductsFromCart(cart) {
        try {
            const response = await this.dao.saveCart(cart) ;
            return new CartOutputDTO(response)
        } catch (e) {
            throw new Error("Error removing all products from cart", e);
        }
    }

    async closePurchase(cart){
        try {
            const response = await this.dao.saveCart(cart);
            return new CartOutputDTO(response);
        } catch (e) {
            throw new Error("Error closing purchase", e);
        }
    }

}

export const cartRepository = new CartRepository(cartDao)


// export const cartRepository = new CartRepository(cartDao)