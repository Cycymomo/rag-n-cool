import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import signupUserMutation from '../apollo/mutations/signup-user'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    const { email, password } = this.state
    return (
      <Mutation mutation={signupUserMutation}>
        {signupUser => (
          <div>
            <div>
              <input
                value={email}
                onChange={({ target: { value: email } }) =>
                  this.setState({ email })
                }
                type="text"
                placeholder="Enter your email"
              />
              <input
                value={password}
                onChange={({ target: { value: password } }) =>
                  this.setState({ password })
                }
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              onClick={() =>
                signupUser({
                  variables: {
                    email,
                    password,
                  },
                })
              }
            >
              Submit
            </button>
          </div>
        )}
      </Mutation>
    )
  }
}

export default SignUp
