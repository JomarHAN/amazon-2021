import express from 'express'
import data from './data.js'
import mongoose from 'mongoose'
import userRouter from './routers/userRouters.js'
import configSecret from './config.js'
import orderRouter from './routers/orderRouters.js'
import productRouter from './routers/productRouters.js'
import path from 'path'
import uploadRouter from './routers/uploadRouter.js'
import draftRouter from './routers/draftRouter.js'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(configSecret.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use('/api/drafts', draftRouter)
app.use('/api/uploads', uploadRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
    res.send(configSecret.paypal_client_id || 'sb')
})
app.get('/api/fields', (req, res) => {
    res.send(data.fields)
})
app.get('/api/config/googlemap', (req, res) => {
    res.send(configSecret.google_api_key || 'gm')
})
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
})

// app.get('/', (req, res) => {
//     res.send('Server is ready')
// })
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

const serverHTTP = http.Server(app)
const io = new Server(serverHTTP, { cors: { origin: '*' } })
const users = []

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        const user = users.find(user => user.socketId === socket.id)
        if (user) {
            user.online = false;
            console.log(`${user.name} is offline`)
            const admin = users.find(user => user.isAdmin && user.online)
            if (admin) {
                io.to(admin.socketId).emit('user-status', user)
            }
        }
    })

    socket.on('onLogin', (user) => {
        const userLogin = {
            ...user,
            online: true,
            socketId: socket.id,
            messages: []
        }
        const existUser = users.find(x => x._id === userLogin._id)
        if (existUser) {
            existUser.online = true;
            existUser.socketId = socket.id
        } else {
            users.push(userLogin)
        }
        console.log(`${userLogin.name} is online`)
        const admin = users.find(x => x.isAdmin && x.online)
        if (admin) {
            io.to(admin.socketId).emit('user-status', userLogin)
        }
        if (userLogin.isAdmin) {
            io.to(userLogin.socketId).emit('list-users', users)
        }
    })

    socket.on('onUserSelect', (user) => {
        const admin = users.find(x => x.isAdmin && x.online)
        if (admin) {
            const existUser = users.find(x => x._id === user._id)
            io.to(admin.socketId).emit('user-select', existUser)
        }
    })

    socket.on('send-message', (message) => {
        if (message.isAdmin) {
            const user = users.find(x => x._id === message._id && x.online)
            if (user) {
                io.to(user.socketId).emit('receive-message', message)
                user.messages.push(message)
            }
        } else {
            const admin = users.find(x => x.isAdmin && x.online)
            if (admin) {
                io.to(admin.socketId).emit('receive-message', message)
                const user = users.find(x => x._id === message._id && x.online)
                user.messages.push(message)
            } else {
                io.to(socket.id).emit('receive-message', {
                    body: "Sorry, I'm offline now!",
                    name: "Admin",
                    isAdmin: true
                })
            }
        }
    })

})

const port = process.env.PORT || 5000;
serverHTTP.listen(port, () => console.log(`Server IO is running on localhost:${port}`))
// app.listen(port, () => console.log(`Server is running on localhost:${port}`))