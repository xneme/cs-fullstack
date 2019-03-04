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
        <Notifications />
        <LoginForm setUser={setUser} />
      </div>
    )
  } else {
    return (
      <div>
        <Notifications />
        <UserInfo user={user} setUser={setUser} />
        <BlogForm blogs={blogs} setBlogs={setBlogs} />
        <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
      </div>
    )
  }
}

export default App
