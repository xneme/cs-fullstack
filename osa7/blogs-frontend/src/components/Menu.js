import React from 'react'
import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'
import { Menu as SemanticMenu } from 'semantic-ui-react'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <SemanticMenu>
        <SemanticMenu.Item link>
          <Link style={padding} to="/">
            Blogs
          </Link>
        </SemanticMenu.Item>
        <SemanticMenu.Item link>
          <Link style={padding} to="/users">
            Users
          </Link>
        </SemanticMenu.Item>
        <SemanticMenu.Item position="right">
          <UserInfo />
        </SemanticMenu.Item>
      </SemanticMenu>
    </div>
  )
}

export default Menu
