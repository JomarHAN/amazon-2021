import express from 'express'
import data from './data.js'
import mongoose from 'mongoose'
import userRouter from './routers/userRouters.js'
import configSecret from './config.js'
import orderRouter from './routers/orderRouters.js'
import productRouter from './routers/productRouters.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(configSecret.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
    res.send(configSecret.paypal_client_id || 'sb')
})

app.get('/', (req, res) => {
    res.send('Server is ready')
})
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on localhost:${port}`))