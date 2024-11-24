import { Router } from "express";
import path from "path";
import { promises as fs } from 'node:fs'
import { __dirname } from "../path.js";

const viewsRouter = Router()


const productsPath = path.resolve(__dirname, 'db/products.json');


viewsRouter.get('/products', async (req, res) => {
    try {
        const productsData = await fs.readFile(productsPath, 'utf-8');
        const products = JSON.parse(productsData);
        res.render('templates/index', { products });
    } catch (error) {
        console.error('Error reading the products', error);
        res.status(500).json({status: 'error', message: 'Error reading the products', });
    }
});

viewsRouter.get('/realtimeproducts', (req, res)=>{
    res.render('templates/realTimeProducts', {products})
})


export default viewsRouter