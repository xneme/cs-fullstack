import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { loginUserAction } from '../reducers/userReducer'
import { errorNotificationAction } from '../reducers/notificationReducer'

const LoginForm = ({ loginUser, errorNotification }) => {
  const { reset: usernameReset, ...username } = useField('text')
  const { reset: passwordReset, ...password } = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await loginUser(username.value, password.value)
      //usernameReset()
      //passwordReset()
    } catch (exception) {
      errorNotification(exception.response.data.error)
    }
  }

  return (
    <div className="loginForm">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  loginUser: loginUserAction,
  errorNotification: errorNotificationAction
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)
