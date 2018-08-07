# 🔥 typewars 🔥

This codebase replicates the key points of an existing application and explores the ease and goodness of typing it with the two most prominent competitors in the space, TypeScript and Flow.

Each iteration of the codebase consists of
1. Core components from `create-react-app`
1. Styles supplied by styled-components
1. Routing through two pages with `react-router`
1. Multiple layers of composed higher-order-components through `recompose`
1. Query and Mutation of form content with `React-Apollo`

Each application has a number of comments detailing some experiences, with the full write up coming soon.

## Running the applications
There are three applications within this repository. Two front-end ones, `ts` and `flow`, as well as a server providing data via graphql, `graphql-server`.

#### GraphQL API
1. Go into `/graphql-server`
1. Install dependencies with `yarn`
1. Run with `node index.js`

Your server is now running at [http://localhost:4000](http://localhost:4000). A playground is also available at this address.

#### TypeScript and Flow react applications
1. Go into `/ts` or `flow` for the TypeScript or Flow applications respectively
1. Install dependencies with `yarn`
1. Run with `yarn start`
