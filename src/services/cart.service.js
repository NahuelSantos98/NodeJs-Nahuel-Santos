import { cartRepository } from '../repository/cart.repository.js';
import { productRepository } from '../repository/product.repository.js';
import { ticketService } from '../services/ticket.service.js';

class CartService {
    constructor(repository) {
        this.repository = repository;
        this.productRepository = productRepository;
        this.ticketService = ticketService;
    }

    async getAllCarts() {
        try {
            const response = await this.repository.getAllCarts();
            if (!response) throw new Error("Carts not found");
            return response;
        } catch (error) {
            throw new Error("Error retrieving all carts: " + error.message);
        }
    }

    async createCart(body) {
        try {
            const response = await this.repository.createCart(body);
            if (!response) throw new Error("Cart not created");
            return response;
        } catch (error) {
            throw new Error("Error creating cart: " + error.message);
        }
    }

    async createCartForRegister() {
        try {
            const response = await this.repository.createCartForRegister();
            if (!response) throw new Error("Cart not created");
            return response;
        } catch (error) {
            throw new Error("Error creating cart: " + error.message);
        }
    }

    async getCartById(cartId) {
        try {
            const response = await this.repository.getCartByIdPopulated(cartId);
            if (!response) throw new Error("Cart not found");
            return response;
        } catch (error) {
            throw new Error("Error retrieving cart by ID: " + error.message);
        }
    }

    async addProductToCart(cartId, productId, quantity, res) {
        try {
            const cart = await this.repository.findCart(cartId);
            if (!cart) {
                res.status(404).json({ status: "error", message: "Cart Not Found" });
                throw new Error("Cart Not found");
            }

            const index = cart.products.findIndex(p => p.prodId.toString().trim() === productId.trim());
            if (index !== -1) {
                cart.products[index].quantity += quantity;
            } else {
                cart.products.push({ prodId: productId, quantity });
            }

            const response = await this.repository.addProductToCart(cart);
            if (!response) throw new Error("Product not added");

            return response;
        } catch (error) {
            throw new Error("Error adding product to cart: " + error.message);
        }
    }

    async updateProductsCart(cartId, productsArray, res) {
        try {
            const cartFound = await this.repository.findCart(cartId);

            if (!cartFound) return res.status(404).json({ status: "error", message: `Cart with id: ${cartId} not found` });

            cartFound.products = productsArray;

            const response = await this.repository.updateProductsCart(cartFound);
            if (!response) throw new Error("Products from Cart not updated");
            return response;
        } catch (error) {
            throw new Error("Error updating products in cart: " + error.message);
        }
    }

    async modifyQuantity(cartId, prodId, quantity, res) {
        try {
            const cartFound = await this.repository.findCart(cartId);
            if (!cartFound) {
                return res.status(404).json({ status: "error", message: `Cart with id: ${cartId} not found` });
            }

            const index = cartFound.products.findIndex(p => p.prodId._id == prodId);

            if (index == -1) return res.status(404).json({ status: "error", message: `Product with id: ${prodId} not found ` });

            cartFound.products[index].quantity = quantity;

            const response = await this.repository.modifyQuantity(cartFound);

            if (!response) throw new Error("Product quantity not modified");
            return response;
        } catch (error) {
            throw new Error("Error modifying product quantity in cart: " + error.message);
        }
    }

    async removeProductFromCart(cartId, prodId, res) {
        try {
            const cart = await this.repository.findCart(cartId);

            if (!cart) {
                return res.status(404).json({ status: "error", message: `Cart with id ${cartId} not found` });
            }

            const productIndex = cart.products.findIndex(p => p.prodId._id == prodId);

            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);
                const response = await this.repository.removeProductFromCart(cart);
                if (!response) throw new Error("Product not removed");
                return response;
            } else {
                return res.status(404).json({ status: "error", message: `Product with id ${prodId} not found in cart` });
            }
        } catch (error) {
            throw new Error("Error removing product from cart: " + error.message);
        }
    }

    async removeAllProductsFromCart(cartId, res) {
        try {
            const cart = await this.repository.findCart(cartId);

            if (!cart) {
                return res.status(404).json({ status: "error", message: `Cart with id ${cartId} not found` });
            }

            cart.products = [];

            const response = await this.repository.removeAllProductsFromCart(cart);
            if (!response) throw new Error("Products not removed");
            return response;
        } catch (error) {
            throw new Error("Error removing all products from cart: " + error.message);
        }
    }

    async closePurchase(cartId, user, res) {
        try {
            const cart = await this.repository.findCart(cartId);
            if (!cart) {
                return res.status(404).json({ status: "error", message: `Cart with id ${cartId} not found` });
            }
    
            let totalAmount = 0;
            let updatedCartProducts = [];
            let outOfStockProducts = [];
    
            // Iteramos sobre los productos del carrito
            for (const product of cart.products) {
                const productInStock = await this.productRepository.getProductByIdPlain(product.prodId);
    
                if (productInStock) {
                    if (productInStock.stock >= product.quantity) {
                        // Si hay stock suficiente, actualizamos el stock y calculamos el monto
                        productInStock.stock -= product.quantity;
                        await productInStock.save();
    
                        totalAmount += productInStock.price * product.quantity;
    
                        // Guardamos el producto para el carrito actualizado
                        updatedCartProducts.push({
                            prodId: product.prodId,
                            title: productInStock.title,
                            price: productInStock.price,
                            quantity: product.quantity,
                        });
                    } else {
                        // Si no hay stock suficiente, lo agregamos a la lista de productos fuera de stock
                        outOfStockProducts.push(product.prodId);
                        console.log(`Insufficient stock for product ${product.prodId}`);
                    }
                } else {
                    // Si el producto no existe, lo agregamos a los productos fuera de stock
                    outOfStockProducts.push(product.prodId);
                    console.log(`Product with id ${product.prodId} not found`);
                }
            }
    
            if (updatedCartProducts.length === 0) {
                return res.status(400).json({
                    status: "error",
                    message: `No products available for purchase. Out of stock products: ${outOfStockProducts.join(", ")}`
                });
            }
    
            // Si hay productos fuera de stock, los logueamos
            if (outOfStockProducts.length > 0) {
                console.log(`Products with no stock: ${outOfStockProducts.join(", ")}`);
            }
    
            // Actualizamos el carrito con los productos que tienen stock
            cart.products = updatedCartProducts;
    
            // Creamos el ticket de compra
            const ticket = await this.ticketService.createTicket({
                amount: totalAmount,
                purchaser: user.email
            });
    
            // Guardamos el carrito con los productos actualizados
            const response = await this.repository.closePurchase(cart);
    
            if (!response) {
                throw new Error("Error closing purchase, cart could not be saved");
            }

            try {
                if(response) await this.removeAllProductsFromCart(cartId)
            } catch (error) {
                throw new Error("Error emptying cart: " + error.message);
            }
    
            return {ticket}
        } catch (error) {
            throw new Error("Error closing purchase: " + error.message);
        }
    }
    
}

export const cartService = new CartService(cartRepository);
