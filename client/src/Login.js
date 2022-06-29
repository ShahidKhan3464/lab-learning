import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const history = useHistory()

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:3001/user/login', {
                email: email,
                password: password
            })
            console.log(data)
            setToken(data)
            localStorage.setItem('token', data)
            history.push({
                pathname: '/'
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {token && <h1>{token}</h1>}
            <form className="ui form" onSubmit={registerUser}>
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

export default Login
