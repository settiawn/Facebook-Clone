const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");
const {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
} = require("./schemas/post");
const {
  typeDefs: followTypeDefs,
  resolvers: followResolvers,
} = require("./schemas/follow");
const { verifyToken } = require("./helpers/jwt");
const { ObjectId } = require("mongodb");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    return {
      auth: () => {
        const { authorization } = req.headers;
        if (!authorization) throw new Error("Auth failed");
        const [type, token] = authorization.split(" ");
        if (type !== "Bearer") throw new Error("Auth failed");
        const decoded = verifyToken(token);
        if (!decoded) throw new Error("Auth failed");
        decoded.id = new ObjectId(String(decoded.id));
        return decoded;
      },
    };
  },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
