import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    passwordType: 'password',
    errorMsg: '',
    isError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMsg,
      isError: true,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onUsernameChange = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onPasswordChange = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onClickCheckbox = event => {
    if (event.target.checked) {
      this.setState({
        passwordType: 'text',
      })
    } else {
      this.setState({
        passwordType: 'password',
      })
    }
  }

  render() {
    const {username, password, passwordType, errorMsg, isError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to='/' />
    }
    return (
      <div data-testid='bgLoginContainer' className='bg-login-container'>
        <div data-testid='loginContainer' className='login-container'>
          <h1 data-testid='loginHeading' className='login-heading'>
            Daily Mood Tracker
          </h1>
          <form
            data-testid='form'
            className='form'
            onSubmit={this.onSubmitForm}
          >
            <div data-testid='inputContainer1' className='input-container'>
              <label
                data-testid='label1'
                className='label'
                htmlFor='username-input'
              >
                USERNAME
              </label>
              <input
                data-testid='input1'
                className='input'
                value={username}
                id='username-input'
                onChange={this.onUsernameChange}
                type='text'
                placeholder='rahul'
              />
            </div>
            <div data-testid='inputContainer2' className='input-container'>
              <label
                data-testid='label2'
                className='label'
                htmlFor='password-input'
              >
                PASSWORD
              </label>
              <input
                data-testid='input2'
                className='input'
                value={password}
                id='password-input'
                placeholder='rahul@2021'
                onChange={this.onPasswordChange}
                type={`${passwordType}`}
              />
            </div>
            <div data-testid='checkboxContainer' className='checkbox-container'>
              <input
                data-testid='checkboxInputs'
                className='checkbox-inputs'
                id='checkbox-input'
                onChange={this.onClickCheckbox}
                type='checkbox'
              />
              <label
                data-testid='checkboxLabel'
                className='checkbox-label'
                htmlFor='checkbox-input'
              >
                Show Password
              </label>
            </div>
            <button
              data-testid='loginButton'
              type='submit'
              className='login-button'
            >
              Login
            </button>
            {isError ? (
              <p
                data-testid='errorMsg'
                className='error-msg'
              >{`${errorMsg}`}</p>
            ) : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
