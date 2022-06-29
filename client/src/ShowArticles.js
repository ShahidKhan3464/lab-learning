import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'

export default function ShowArticles() {
    const [article, setArticle] = useState([])
    const history = useHistory()
    const [token, setToken] = useState('')

    useEffect(() => {
        const getData = async () => {
            try {
                setToken(localStorage.getItem('token'))
                const { data } = await axios.get('http://localhost:3001/article', {
                    headers: {
                        token: token
                    }
                })
                // console.log(data)
                setArticle(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [article, token])

    const handleDelete = async (id) => {
        try {
            const deletedArticle = await axios.delete(`http://localhost:3001/article/${id}`)
            if (deletedArticle) {
                alert(`Deleted ${deletedArticle.data.book} successfully`)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (row) => {
        history.push({
            pathname: '/edit',
            state: row
        })
    }

    return (
        <div>
            <table className="ui celled table">
                <thead>
                    <tr><th>Book</th>
                        <th>Author</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr></thead>
                <tbody>
                    {
                        article.length === 0 ?
                            <tr>
                                <td
                                    colSpan='3'
                                    style={{ textAlign: 'center', color: 'red', fontSize: 'large' }}
                                >No Articles Found</td>
                            </tr>
                            : article.map((row) => {
                                return (
                                    <tr>
                                        <td data-label="Book">{row.book}</td>
                                        <td data-label="Author">{row.author}</td>
                                        <td data-label="Type">{row.type}</td>
                                        <td>
                                            <button onClick={e => handleEdit(row)}>Edit</button>
                                            <button onClick={e => handleDelete(row._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </table>
            <hr />
        </div>
    )
}
