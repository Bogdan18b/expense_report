const {GraphQLServer} = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const db = require('./db');
const {typeDefs} = require('../generated/prisma-client/prisma-schema');

function createServer() {
  return new GraphQLServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({...req, db}),
  })
}

module.exports = createServer;
