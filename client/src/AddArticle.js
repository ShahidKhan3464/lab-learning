import React, { useState } from 'react'
import axios from 'axios'

export default function AddArticle() {
    const [book, setBook] = useState('')
    const [author, setAuthor] = useState('')
    const [type, setType] = useState('')

    const handleChange = (e) => {
        if (e.target.name === 'book')
            setBook(e.target.value)
        else if (e.target.name === 'author')
            setAuthor(e.target.value)
        else if (e.target.name === 'type')
            setType(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setBook('')
        setAuthor('')
        setType('')
        try {
            const res = await axios.post('http://localhost:3001/article', {
                book: book,
                author: author,
                type: type
            })
            console.log(res)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>AddArticle</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Book</label>
                    <input
                        type="text"
                        value={book}
                        name="book"
                        placeholder="Book..."
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label>Author</label>
                    <input
                        type="text"
                        value={author}
                        name="author"
                        placeholder="Author..."
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label>Type</label>
                    <input
                        type="text"
                        value={type}
                        name="type"
                        placeholder="Type..."
                        onChange={handleChange}
                    />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </div>
    )
}
