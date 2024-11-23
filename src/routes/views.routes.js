import { Router } from "express";
import path from "path";
import { promises as fs } from 'node:fs'
import { __dirname } from "../path.js";

const viewsRouter = Router()


const productsPath = path.resolve(__dirname, 'db/products.json');
const productsData = await fs.readFile(productsPath, 'utf-8');
const products = JSON.parse(productsData);




viewsRouter.get('/products', (req, res)=>{
    res.render('templates/index', {products})
})

viewsRouter.get('/realtimeproducts', (req, res)=>{
    res.render('templates/realTimeProducts', {products})
})


export default viewsRouter