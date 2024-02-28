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
    followUser: async (_, args, context) => {
      try {
        const { id } = args;
        const user = context.auth();
        const result = await Follow.add(id, user.id);
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
