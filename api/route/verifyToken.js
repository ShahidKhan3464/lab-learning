const jwt = require('jsonwebtoken')
const { model } = require('mongoose')
require('dotenv/config')

module.exports = function (req, res, next) {
    try {
        const verify = jwt.verify(req.headers.token, process.env.SECRET)  // To verify the token
        console.log(verify)
        next()
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}