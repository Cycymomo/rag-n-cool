import { fromEvent } from 'graphcool-lib'

const userQuery = `
query UserQuery($userId: ID!) {
  User(id: $userId){
    id
    password
  }
}`

const getUser = (api, userId) =>
  api
    .request(userQuery, { userId })
    .then(userQueryResult => userQueryResult.User)
    .catch(error => ({ error: `An unexpected error occured ${JSON.stringify(error)}` }))

module.exports = event => {
  if (!event.context.auth || !event.context.auth.nodeId) {
    return { data: { id: null } }
  }

  const userId = event.context.auth.nodeId
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  return getUser(api, userId)
    .then(emailUser => {
      if (!emailUser) {
        return { error: `No user with id: ${userId}` }
      }
      return { data: emailUser }
    })
    .catch(error => ({ error: `An unexpected error occured ${JSON.stringify(error)}` }))
}
