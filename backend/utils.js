import configSecret from './config.js'
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign(
        {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            _id: user._id
        },
        configSecret.jwt_secret || 'somethingsecret',
        {
            expiresIn: '30d'
        }
    )
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization) {
        const token = authorization.slice(7)
        jwt.verify(
            token,
            configSecret.jwt_secret || 'somethingsecret',
            (err, decoded) => {
                if (err) {
                    res.status(400).send({ message: "Invalid Token" })
                } else {
                    req.user = decoded
                    next()
                }
            }
        )
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send({ message: "Invalid Token" })
    }
}

export const isSeller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
        next()
    } else {
        res.status(401).send({ message: "Invalid Token" })
    }
}

export const isSellerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
        next()
    } else {
        res.status(401).send({ message: "Invalid Token" })
    }
}