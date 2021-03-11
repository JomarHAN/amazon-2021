import configSecret from './config.js'
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign(
        {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            _id: user._id
        },
        configSecret.jwt_secret || 'somethingsecret',
        {
            expiresIn: '30d'
        }
    )
}

