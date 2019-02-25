import React from 'react'
import blogService from '../services/blogs'

const UserInfo = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken('')
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserInfo
