const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: bookTypeDefs,
  resolvers: bookResolvers,
} = require("./schemas/book");

const server = new ApolloServer({
  typeDefs: [bookTypeDefs],
  resolvers: [bookResolvers],
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
