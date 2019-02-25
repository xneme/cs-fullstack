import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import Notifications from './components/Notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notifications
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      </div>
    )
  } else {
    return (
      <div>
        <Notifications
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
        <UserInfo user={user} setUser={setUser} />
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
        <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
      </div>
    )
  }
}

export default App
