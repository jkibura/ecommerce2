import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { format } from 'date-fns/format'
import { authRouter } from "./routes/auth"
import { cartRouter } from "./routes/cart"
import { ordersRouter } from "./routes/orders"
import { productsRouter } from "./routes/products"
dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())


app.use((req, res, next) => {
    console.log(req.method, req.body, req.path, 'at', format(new Date(), 'yyyy-MM-dd HH:mm'))
    next()
})

app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', ordersRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        app.listen(process.env.PORT, () => {
            console.log("Server is running on PORT", process.env.PORT, 'at', format(new Date(), 'yyyy-MM-dd HH:mm'))
        })
    }).catch(error =>{
        console.log(error)
    })