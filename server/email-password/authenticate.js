import { fromEvent } from 'graphcool-lib'
import bcryptjs from 'bcryptjs'

const userQuery = `
query UserQuery($email: String!) {
  User(email: $email){
    id
    password
  }
}`

const getGraphcoolUser = (api, email) =>
  api.request(userQuery, { email }).then(userQueryResult => {
    if (userQueryResult.error) {
      return Promise.reject(userQueryResult.error)
    }
    return userQueryResult.User
  })

module.exports = event => {
  if (!event.context.graphcool.pat) {
    return { error: 'Email Authentication not configured correctly.' }
  }

  const { email, password } = event.data
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  return getGraphcoolUser(api, email)
    .then(graphcoolUser => {
      if (!graphcoolUser) {
        return Promise.reject(new Error('Invalid Credentials'))
      }
      return bcryptjs.compare(password, graphcoolUser.password).then(passwordCorrect => {
        if (passwordCorrect) {
          return graphcoolUser.id
        }
        return Promise.reject(new Error('Invalid Credentials'))
      })
    })
    .then(graphcoolUserId => graphcool.generateAuthToken(graphcoolUserId, 'User'))
    .then(token => ({ data: { token } }))
    .catch(error => ({ error: `An unexpected error occured ${JSON.stringify(error)}` }))
}
