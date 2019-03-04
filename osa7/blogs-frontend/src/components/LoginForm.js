import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useField } from '../hooks'

const LoginForm = ({ setUser, setErrorMessage }) => {
  const { reset: usernameReset, ...username } = useField('text')
  const { reset: passwordReset, ...password } = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      usernameReset()
      passwordReset()
      setUser(user)
    } catch (exception) {
      console.log('error happened:', exception)
      setErrorMessage(exception.response.data.error)
      setTimeout(() => setErrorMessage(null), 3000)
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

export default LoginForm
