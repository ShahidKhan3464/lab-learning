import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddArticle from './AddArticle'
import EditArticle from './EditArticle'
import Register from './Register'
import Login from './Login'
import Logout from './Logout'
import ShowArticles from './ShowArticles'

export default function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/' component={ShowArticles} />
                    <Route path='/edit' component={EditArticle} />
                    <Route path='/add' component={AddArticle} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/logout' component={Logout} />
                </Switch>
            </Router>
        </div>
    )
}