import React, { useState } from 'react'

const LoginForm = ({ setToken, login, handleError, setView }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const result = await login({
        variables: { username, password }
      })
      if (!result) {
        console.log('this should not happen.')
      }
      window.localStorage.setItem('library-app-token', result.data.login.value)
      setToken(result.data.login.value)
      setView('AUTHORS')
    } catch (error) {
      handleError(error.message)
    }
  }

  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
