const Follow = require("../models/follow");

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type Query {
        findAll: String
    }

    type Mutation {
        followUser(id: String) : Follow
    }
`;

const resolvers = {
  Query: {
    findAll: () => {
      return "OK";
    },
  },
  Mutation: {
    followUser: async () => {
      return "OK";
    },
  },
};

module.exports = { typeDefs, resolvers };
