import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notifications from './components/Notifications'
import Users from './components/Users'
import Menu from './components/Menu'
import User from './components/User'
import Blog from './components/Blog'
import { initializeBlogsAction } from './reducers/blogReducer'
import { initializeUsersAction } from './reducers/usersReducer'
import { setUserAction } from './reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

const App = ({ initializeBlogs, initializeUsers, user, setUser }) => {
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
      <Container>
        <Notifications />
        <LoginForm />
      </Container>
    )
  } else {
    return (
      <Container>
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
            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => <Blog id={match.params.id} />}
            />
          </div>
        </Router>
      </Container>
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
