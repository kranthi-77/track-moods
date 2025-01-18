import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const [errorMsg, setErrorMsg] = useState('')
  const [isError, setIsError] = useState(false)

  const history = useHistory()

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSubmitFailure = msg => {
    setErrorMsg(msg)
    setIsError(true)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const onClickCheckbox = event => {
    setPasswordType(event.target.checked ? 'text' : 'password')
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div data-testid="bgLoginContainer" className="bg-login-container">
      <div data-testid="loginContainer" className="login-container">
        <h1 data-testid="loginHeading" className="login-heading">
          Daily Mood Tracker
        </h1>
        <form data-testid="form" className="form" onSubmit={onSubmitForm}>
          <div data-testid="inputContainer1" className="input-container">
            <label
              data-testid="label1"
              className="label"
              htmlFor="username-input"
            >
              USERNAME
            </label>
            <input
              data-testid="input1"
              className="input"
              value={username}
              id="username-input"
              onChange={e => setUsername(e.target.value)}
              type="text"
              placeholder="rahul"
            />
          </div>
          <div data-testid="inputContainer2" className="input-container">
            <label
              data-testid="label2"
              className="label"
              htmlFor="password-input"
            >
              PASSWORD
            </label>
            <input
              data-testid="input2"
              className="input"
              value={password}
              id="password-input"
              placeholder="rahul@2021"
              onChange={e => setPassword(e.target.value)}
              type={passwordType}
            />
          </div>
          <div data-testid="checkboxContainer" className="checkbox-container">
            <input
              data-testid="checkboxInputs"
              className="checkbox-inputs"
              id="checkbox-input"
              onChange={onClickCheckbox}
              type="checkbox"
            />
            <label
              data-testid="checkboxLabel"
              className="checkbox-label"
              htmlFor="checkbox-input"
            >
              Show Password
            </label>
          </div>
          <button
            data-testid="loginButton"
            type="submit"
            className="login-button"
          >
            Login
          </button>
          {isError && (
            <p data-testid="errorMsg" className="error-msg">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
