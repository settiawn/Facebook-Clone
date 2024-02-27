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

  type Token {
    token: String
  }

  type Query {
    users : [User]
    login(email: String, password: String) : Token
  }

  type Mutation {
    register(newUser: newUser): User
    
  }
`;

//controller
const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = User.findAll();
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    login: async (_, args) => {
      try {
        const { email, password } = args;
        if (!email) throw error;
        if (!password) throw error;
        const token = await User.getUser(email, password);
        return { token };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      try {
        const newUser = { ...args.newUser };
        newUser.password = hashPassword(newUser.password);
        const user = await User.create(newUser);
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
