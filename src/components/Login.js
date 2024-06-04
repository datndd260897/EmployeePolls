import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/authedUser'
import '../style/Login.css'

const Login = (prop) => {
  const [userID, setUserID] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const isValidUser = () => {
    if (prop.users[userID]) {
      return password === prop.users[userID].password
    }
    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValidUser()) {
      prop.dispatch(login(prop.users[userID]))
      if (location.state?.from) {
        navigate(location.state.from)
      } else {
        navigate('/')
      }
    } else {
      setErrorMsg('The username or password is incorrect. Please try again.')
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="error">{errorMsg}</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type="text"
            value={userID}
            onChange={(e) => {
              setErrorMsg('')
              setUserID(e.target.value)
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type="password"
            value={password}
            onChange={(e) => {
              setErrorMsg('')
              setPassword(e.target.value)
            }}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default connect((state) => ({
  users: state.users,
}))(Login)
