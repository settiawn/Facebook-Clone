const User = require("../models/user");

const typeDefs = `#graphql
    # model
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  input newUser {
    name: String
    username: String
    email: String
    password: String
  }

  type Query {
    users : [User]
  }

  type Mutation {
    addUser(newUser: newUser): User
  }
`;

//controller
const resolvers = {
  Mutation: {
    addUser: async (_, args) => {
      try {
        const newUser = { ...args.newUser };
        const user = await User.create(newUser);
        return user;
      } catch (error) {
        console.log(error);
        throw error
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
