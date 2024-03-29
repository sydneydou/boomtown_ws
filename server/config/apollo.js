const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('../api/schema');
let resolvers = require('../api/resolvers');

module.exports = ({ app, pgResource }) => {
  resolvers = resolvers(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });
  // -------------------------------

  const apolloServer = new ApolloServer({
    context: ({ req }) => {
      const tokenName = app.get("JWT_COOKIE_NAME")
      const token = req ? req.cookies[tokenName] : undefined


      return {
        req,
        token,
        pgResource
        /**
         * @TODO: Provide Apollo context
         *
         * When initializing Apollo, we can provide a context object which will be
         * passed to each resolver function. This is useful because there are a
         * number of things we'll need to access in every resolver function.
         *
         * Above we can see that we are capturing the cookie from the request object,
         * and retrieving the token. This is important for authentication.
         *
         * Refactor this code and supply any additional information (values, methods, objects...etc)
         * you'll need to use in your resolving functions.
         */
      };
    },
    schema
  });

  apolloServer.applyMiddleware({
    app,
    // @TODO: Add the CORS_CONFIG from your application configuration
    cors: undefined
    // -------------------------------
  });
};
