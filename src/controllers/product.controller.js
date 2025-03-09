import productModel from '../models/product.model.js';
import { productService } from "../services/product.service.js";

class ProductController {
    constructor(service) {
        this.service = service

        this.getAllFiltered = this.getAllFiltered.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.updateProductById = this.updateProductById.bind(this);
        this.deleteProductById = this.deleteProductById.bind(this);
    }

    async getAllFiltered(req, res, next) {
        try {
            let response = await this.service.getAllFiltered(req.query, res);
            res.status(200).json({ payload: response });
        } catch (e) {
            console.log('Error en ProductController');
            next(e);
        }
    }

    async getProductById(req, res, next) {
        try {
            const prodId = req.params.pid;

            if (!prodId) {
                res.status(400).json("The Product Id must be provided");
            }

            const response = await this.service.getProductById(prodId);
            if (!response) {
                return res.status(404).json({ status: "error", message: `Product not found` });
            }
            res.status(200).json({ status: 'success', payload: response });
        } catch (e) {
            console.log('Error en ProductController:', e);
            next(e);
        }
    }

    async createProduct(req, res, next) {
        try {
            const body = req.body

            const response = await this.service.createProduct(body, res)

            if (!response) {
                return res.status(400).json({ status: "error", message: "Product not created, please try again." });
            }

            res.status(201).json({ status: "success", payload: response, message: `The product has been created with id: ${response.id}` })
        } catch (e) {
            console.log('Error en ProductController');
            next(e)
        }
    }


    async updateProductById(req, res, next) {
        try {
            let prodId = req.params.pid;
            let updatedProduct = req.body;

            if (!prodId) {
                return res.status(400).json({ status: "error", message: "The Product Id must be provided" });
            }
            
            const response = await this.service.updateProductById(prodId, updatedProduct)

            if (!response) {
                return res.status(404).json({ status: "error", message: `Product with id ${prodId} not found` });
            }

            res.status(200).json({ status: "success", payload: response, message: `Product with id ${prodId} modified successfully` });

        } catch (e) {
            console.log('Error en ProductController');
            next(e)
        }
    };


    async deleteProductById(req, res, next) {
        try {
            let prodId = req.params.pid

            if (!prodId) {
                return res.status(400).json({ status: "error", message: "The Product Id must be provided" })
            }

            const response = await this.service.deleteProductById(prodId, res)

            if (!response) {
                return res.status(404).json({ status: "error", message: `Product with id ${prodId} not found` });
            }

            res.status(200).json({ status: 'success', data: {}, message: `Product with id: ${prodId} has been deleted` })
        } catch (e) {
            console.log('Error en ProductController');
            next(e)
        }
    }


}

export const productController = new ProductController(productService);


export const renderProducts = async (req, res, next) => {
    try {
        let { limit = 10, page = 1, sort, category, stock } = req.query;

        if (limit < 0 || page < 0) {
            return res.status(400).json({ status: 'error', message: 'The limit and the page must be positive numbers' });
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

        if (category && stock !== undefined) {
            return res.status(400).json({ status: 'error', message: 'Please specify either category or stock, not both at the same time.', });
        }

        const products = await productModel
            .find(filter)
            .lean() //Convierte los docs a obj JS. 
            .skip(skip)
            .sort(sortOption)
            .limit(limitInt);

        const totalProducts = await productModel.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limitInt);

        const hasPrevPage = pageInt > 1;
        const hasNextPage = pageInt < totalPages;

        const prevLink = hasPrevPage
            ? `/views/products?${limit ? `limit=${limitInt}` : ''}${page ? `&page=${pageInt - 1}` : ''}${sort ? `&sort=${sort}` : ''}${category ? `&category=${category}` : ''}${stock ? `&stock=${stock}` : ''}`
            : null;

        const nextLink = hasNextPage
            ? `/views/products?${limit ? `limit=${limitInt}` : ''}${page ? `&page=${pageInt + 1}` : ''}${sort ? `&sort=${sort}` : ''}${category ? `&category=${category}` : ''}${stock ? `&stock=${stock}` : ''}`
            : null;

        res.status(200).render('templates/index', {
            products,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
            currentPage: pageInt,
        });

    } catch (e) {
        console.error('An error occurred:', e);
        res.status(500).json({ status: 'error', message: 'Internal server error. Please try again later.', });
    }
};

export const renderProductDetail = async (req, res, next) => {
    try {
        let prodId = req.params.pid

        if (!prodId) {
            return res.status(404).json({ status: "error", message: "The Product Id must be provided" })
        }

        let response = await productModel.findById(prodId).lean()

        if (!response) {
            return res.status(404).json({ status: "error", message: `Product with id: ${prodId} not found` })
        }

        res.status(200).render('templates/productDetail', { response });
    } catch (e) {
        next(e)
    }
}