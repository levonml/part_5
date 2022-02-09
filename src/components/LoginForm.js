import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleNameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)
  const login = (event) => {
    event.preventDefault()
    handleLogin({ userName, password })
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={login}>
      <div>
				login
        <input value={userName} name="Username" onChange={handleNameChange} />
      </div>
      <div>
				password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
export default LoginForm
