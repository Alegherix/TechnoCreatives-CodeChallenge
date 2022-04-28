# Balloon Storefront

This is a simple Storefront for selling balloons.

## Getting started

To get started:

1. First, run `yarn install` on your terminal to fetch all dependencies
2. In the applications's root directory, create a file for environment variables by running `cp .env.sample .env`
3. Open the .env file, and make sure the `REACT_APP_GRAPHQL_ENDPOINT` environment variable points to the Balloons GraphQL API endpoint
   (usually https://balloons.thetc.se/graphql)
4. Run `yarn start` to start the application

After following the instructions above, simply navigate to `http://localhost:3000/`, where you will be able to see the different Balloons for sale.

## About the application

### Stack & tooling

The application is written in React and TypeScript, as well as the following:

- [TailwindCSS](https://tailwindcss.com) for styling using utility classes
- [GraphQL Code Generator](https://www.graphql-code-generator.com) For generating types from queries
- [React Router v6](https://reactrouter.com/) for routing within the application
- [URQL](https://formidable.com/open-source/urql/) for querying the data layer & caching
