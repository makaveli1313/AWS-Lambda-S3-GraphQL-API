const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');
const dotenv = require('dotenv').config();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});


exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
});
