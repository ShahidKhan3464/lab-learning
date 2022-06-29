const express = require('express')

// Here actually model is imported with the name Article
const Article = require('..//model/Article')

// Related to one end point, specific route 
const articleRoute = express.Router()

const auth = require('./verifyToken')

articleRoute.get('/', auth, async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles)
    }
    catch (error) {
        console.log(error)
    }
})

articleRoute.post('/', async (req, res) => {
    try {
        // create fun is to insert data in database
        const saveRes = await Article.create({
            book: req.body.book,
            author: req.body.author,
            type: req.body.type
        })
        res.send(saveRes)

    }
    catch (error) {
        console.log(error)
    }
})

articleRoute.patch('/:id', async (req, res) => {
    try {
        const updatedArticle = await Article.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    book: req.body.book,
                    author: req.body.author,
                    type: req.body.type,
                }
            }
        )
        res.send(updatedArticle)
    }
    catch (error) {
        console.log(error)
    }
})

articleRoute.delete('/:id', async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id)
        res.send(deletedArticle)
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = articleRoute