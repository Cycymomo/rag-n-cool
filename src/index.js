import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cji0pwq7i4uh90176hcccygo4',
})

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
)

render(ApolloApp(App), document.getElementById('root'))
registerServiceWorker()
