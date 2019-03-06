import React from 'react'
import { connect } from 'react-redux'
import { clearUserAction } from '../reducers/userReducer'
import { Button } from 'semantic-ui-react'

const UserInfo = ({ user, clearUser }) => {
  const handleLogout = () => {
    clearUser()
  }

  return (
    <div>
      {user.name} logged in <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  clearUser: clearUserAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo)
