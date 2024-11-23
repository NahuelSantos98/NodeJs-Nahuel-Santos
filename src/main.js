import express from 'express'
import productRouter from './routes/producto.routes.js'
import cartRouter from './routes/cart.routes.js'
import {create} from 'express-handlebars'
import path from 'path'
import { __dirname } from './path.js'
import viewsRouter from './routes/views.routes.js'

const app = express()
const PORT = 8080
const hdbs = create()


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.engine('handlebars', hdbs.engine)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'handlebars')


app.use('/static', express.static(path.join(__dirname, 'public')));


app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/views', viewsRouter)

app.use((req, res) => {
    res.status(404).json({status: "error", message: "No request for this endpoint"});
});


app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}/`) 
})