import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import authenticateUserMutation from '../apollo/mutations/authenticate-user'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    const { email, password } = this.state
    return (
      <Mutation mutation={authenticateUserMutation}>
        {(authenticateUser, { data }) =>
          data && data.authenticateUser && data.authenticateUser.token ? (
            <div>Connected ! (token: {data.authenticateUser.token})</div>
          ) : (
            <div>
              <div>
                <input
                  value={email}
                  onChange={({ target: { value } }) => this.setState({ email: value })}
                  type="text"
                  placeholder="Enter your email"
                />
                <input
                  value={password}
                  onChange={({ target: { value } }) => this.setState({ password: value })}
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <button
                onClick={() =>
                  authenticateUser({
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
          )
        }
      </Mutation>
    )
  }
}

export default SignIn
