const { hashPassword } = require("../helpers/bcrypt");
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
  Query: {
    users: async () => {
      try {
        const users = User.findAll()
        return users
      } catch (error) {
        console.log(error);
        throw error
      }
    }
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const newUser = { ...args.newUser};
        newUser.password = hashPassword(newUser.password)
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
