const { hashPassword } = require("../helpers/bcrypt");
const User = require("../models/user");

const typeDefs = `#graphql
    # model
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String!
  }

  input newUser {
    name: String
    username: String!
    email: String!
    password: String!
  }

  type accessToken {
    token: String
  }

  type Query {
    users : [User]
    login(email: String, password: String) : accessToken
    findUser(username: String): User
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
        if (!email) throw new Error("Email tidak boleh kosong");
        if (!password) throw new Error("Password tidak boleh kosong");
        if (password.length < 5)
          throw new Error("Password harus lebih dari 5 huruf");
        const token = await User.getUser(email, password);
        return { token };
      } catch (error) {
        throw error;
      }
    },
    findUser: async (_, args) => {
      try {
        const { username } = args;
        const user = await User.findUser(username);
        return user;
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
