import React from 'react'
import { connect } from 'react-redux'
import { clearUserAction } from '../reducers/userReducer'

const UserInfo = ({ user, clearUser }) => {
  const handleLogout = () => {
    clearUser()
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
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
