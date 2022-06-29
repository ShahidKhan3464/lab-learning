import React, { useState } from 'react'
import axios from 'axios'

function Register() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:3001/user/register', {
                name: fullName,
                email: email,
                password: password
            })
            setMessage(data)
        }
        catch (err) {
            setMessage(err)
        }
    }

    return (
        <div>
            {message && <h1>{message}</h1>}
            <form className="ui form" onSubmit={registerUser}>
                <div className="field">
                    <label>FullName</label>
                    <input
                        type="text"
                        value={fullName}
                        name="fullName"
                        placeholder="Enter your fullName..."
                        onChange={e => setFullName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        name="email"
                        placeholder="Enter your Email..."
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        name="password"
                        placeholder="Enter your password..."
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register
