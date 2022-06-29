const mongoose = require('mongoose')

// This is schema to create the shape of data that is stored in database
const articleSchema = mongoose.Schema({
    book: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Article', articleSchema)