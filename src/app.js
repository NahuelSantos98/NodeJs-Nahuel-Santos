import express from 'express'
import productRouter from './routes/producto.routes.js'
import routeCart from './routes/cart.routes.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productRouter)
app.use('/api/carts', routeCart)

app.use((req, res) => {
    res.status(404).json({status: "error", message: "No request for this endpoint"});
});


app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}/`) 
})