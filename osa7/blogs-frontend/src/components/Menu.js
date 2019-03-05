import React from 'react'
import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      <UserInfo />
    </div>
  )
}

export default Menu
