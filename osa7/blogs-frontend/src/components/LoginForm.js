import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { loginUserAction } from '../reducers/userReducer'
import { errorNotificationAction } from '../reducers/notificationReducer'
import { Form, Button, Input } from 'semantic-ui-react'

const LoginForm = ({ loginUser, errorNotification }) => {
  const { reset: usernameReset, ...username } = useField('text')
  const { reset: passwordReset, ...password } = useField('password')

  const inputStyle = {
    width: '300px'
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await loginUser(username.value, password.value)
    } catch (exception) {
      errorNotification(exception.response.data.error)
      usernameReset()
      passwordReset()
    }
  }

  return (
    <div className="loginForm">
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <Input {...username} style={inputStyle} id="usernameInput" />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <Input {...password} style={inputStyle} id="passwordInput" />
        </Form.Field>
        <Button type="submit" id="loginButton">
          Login
        </Button>
      </Form>
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
