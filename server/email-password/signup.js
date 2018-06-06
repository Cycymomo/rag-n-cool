const { fromEvent } = require('graphcool-lib')
const bcryptjs = require('bcryptjs')
const validator = require('validator')

const userQuery = `
query UserQuery($email: String!) {
  User(email: $email){
    id
    password
  }
}`

const createUserMutation = `
mutation CreateUserMutation($email: String!, $passwordHash: String!) {
  createUser(
    email: $email,
    password: $passwordHash
  ) {
    id
  }
}`

const getGraphcoolUser = (api, email) =>
  api.request(userQuery, { email }).then(userQueryResult => {
    if (userQueryResult.error) {
      return Promise.reject(userQueryResult.error)
    }
    return userQueryResult.User
  })

const createGraphcoolUser = (api, email, passwordHash) =>
  api
    .request(createUserMutation, { email, passwordHash })
    .then(userMutationResult => userMutationResult.createUser.id)

module.exports = event => {
  if (!event.context.graphcool.pat) {
    return { error: 'Email Signup not configured correctly.' }
  }

  // Retrieve payload from event
  const { email, password } = event.data
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  const SALT_ROUNDS = 10
  const salt = bcryptjs.genSaltSync(SALT_ROUNDS)

  if (validator.isEmail(email)) {
    return getGraphcoolUser(api, email)
      .then(graphcoolUser => {
        if (!graphcoolUser) {
          return bcryptjs.hash(password, salt).then(hash => createGraphcoolUser(api, email, hash))
        }
        return Promise.reject('Email already in use')
      })
      .then(graphcoolUserId =>
        graphcool
          .generateAuthToken(graphcoolUserId, 'User')
          .then(token => ({ data: { id: graphcoolUserId, token } }))
      )
      .catch(error => ({ error: `An unexpected error occured ${JSON.stringify(error)}` }))
  }
  return { error: 'Not a valid email' }
}
