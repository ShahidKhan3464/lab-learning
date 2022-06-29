const express = require('express')
const userRoute = express.Router()
const Joi = require('joi');                     // Used for validation
const User = require('..//model/User')
const bcrypt = require('bcrypt')                // Hashing the password
const jwt = require('jsonwebtoken')

const userSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required()
})

userRoute.get('/', (req, res) => {
    res.send([
        { id: 1, name: 'shahid' },
        { id: 2, name: 'ahmad' }
    ])
})

userRoute.post('/register', async (req, res) => {
    const err = userSchema.validate(req.body)
    if (err.error) return res.status(400).send(err.error.details[0].message)

    const duplicateUser = await User.findOne({ email: req.body.email })
    if (duplicateUser == null) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)

        const registeredUser = await User.create({
            name: req.body.name,
            password: hash,
            email: req.body.email
        })
        res.send(req.body.email + ' has been successfully registerd')
    }
    else {
        res.send('Email already exits!!!')
    }
})
userRoute.post('/login', async (req, res) => {
    const password = req.body.password
    const email = req.body.email

    const reg_user = await User.findOne({ email: email })
    const verified = await bcrypt.compare(password, reg_user.password)
    if (verified) {
        const generateToken = jwt.sign({ _id: reg_user.id, iat: Date.now() }, process.env.SECRET)
        res.send(generateToken)
    }
    else {
        res.send('Invalid username or password')
    }
})

userRoute.patch('/', (req, res) => {
    res.send('we are at patch user')
})

userRoute.delete('/', (req, res) => {
    res.send("we are at delete user")
})

module.exports = userRoute