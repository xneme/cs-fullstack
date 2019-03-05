import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notifications from './components/Notifications'
import Users from './components/Users'
import Menu from './components/Menu'
import User from './components/User'
import { initializeBlogsAction } from './reducers/blogReducer'
import { initializeUsersAction } from './reducers/usersReducer'
import { setUserAction } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = ({ initializeBlogs, initializeUsers, user, setUser, users }) => {
  useEffect(() => {
    initializeBlogs()
    initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notifications />
        <LoginForm />
      </div>
    )
  } else {
    return (
      <div>
        <Router>
          <div>
            <Menu />
            <Notifications />
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <BlogForm />
                  <BlogList />
                </div>
              )}
            />
            <Route
              exact
              path="/users"
              render={() => (
                <div>
                  <Users />
                </div>
              )}
            />
            <Route
              exact
              path="/users/:id"
              render={({ match }) => <User id={match.params.id} />}
            />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeBlogs: initializeBlogsAction,
  initializeUsers: initializeUsersAction,
  setUser: setUserAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
