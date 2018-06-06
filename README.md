# RAG² ! (react-apollo-graphql-graphcool)
A react-apollo-graphql serverless boilerplate using Graphcool

  * Uses `create-react-app` and `graphcool-framework` (and Apollo with `apollo-boost`)
  * Opiniated `eslint` config
  * Signup / Signin built-in


# Prerequisites

Create an account on [Graphcool](https://console.graph.cool)

    ❯ npm install -g graphcool-framework
    ❯ graphcool login --token "<Your Token>"
    ❯ git clone git@github.com:Cycymomo/react-apollo-graphql.git <YOUR PROJECT NAME>
    ❯ cd <YOUR PROJECT NAME>
    ❯ npm i

* If you want to contribute to an existing Graphcool project :
  * Ask to become a collaborator


* If you want to create a new Graphcool project :
  * Delete `.graphcoolrc` file
  * Run `❯ graphcool deploy`
    * Follow the step to choose your deployment preferences
  * Modify `src/index.js` and put your Project ID (inserted in `.graphcoolrc` freshly created)


# Run the front
Code is in the `src` directory

    ❯ npm start


# Run Graphcool
Code is in the `server` directory

  - Nothing to do if it's in Graphcool Cloud just `graphcool deploy` when you want to update your schemas / functions
  - See [Graphcool doc](https://github.com/prismagraphql/graphcool-framework#docker) if it's in a local Docker
