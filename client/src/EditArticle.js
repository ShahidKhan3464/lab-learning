import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

export default function EditArticle() {
    const history = useHistory()
    const [book, setBook] = useState(history.location.state.book)
    const [author, setAuthor] = useState(history.location.state.author)
    const [type, setType] = useState(history.location.state.type)
    const [id, setId] = useState(history.location.state._id)

    const handleChange = (e) => {
        if (e.target.name === 'book')
            setBook(e.target.value)
        else if (e.target.name === 'author')
            setAuthor(e.target.value)
        else if (e.target.name === 'type')
            setType(e.target.value)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const updatedArticle = await axios.patch(`http://localhost:3001/article/${id}`,
                {
                    book: book,
                    author: author,
                    type: type
                })
            history.push({ pathname: '/' })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form className="ui form" onSubmit={handleUpdate}>
                <div className="field">
                    <label>Book</label>
                    <input
                        type="text"
                        value={book}
                        name="book"
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label>Author</label>
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label>Type</label>
                    <input
                        type="text"
                        value={type}
                        name="type"
                        onChange={handleChange}
                    />
                </div>
                <button className="ui button" type="submit">Update</button>
            </form>
        </div>
    )
}