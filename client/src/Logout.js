import React from 'react'

function Logout() {
    localStorage.setItem('token', null)
    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}

export default Logout
