const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, async function (err, decode) {
            if (err) {
                res.status(500).send({
                    message: 'Invalid token'
                })
            } else {
                try {
                    req.user = await User.findOne({
                        _id: decode.id
                    })
                    if (req.user) {
                        next()
                    } else {
                        res.status(404).send({
                            message: 'User not found.'
                        })
                    }
                } catch (err) {
                    res.status(500).send({
                        message: err
                    })
                }
            }
        })
    } else {
        res.status(403).send({
            message: 'unauthorized access'
        })
    }
}

module.exports = verifyToken