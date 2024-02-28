const { hashPassword } = require("../helpers/bcrypt");
const validateEmail = require("../helpers/regex");
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

  type Token {
    accessToken: String
  }

  type Query {
    login(email: String, password: String) : Token
    findUser(username: String): User
    findById(id: String): User
  }

  type Mutation {
    register(newUser: newUser): User
  }
`;

//controller
const resolvers = {
  Query: {
    login: async (_, args) => {
      try {
        const { email, password } = args;
        if (!email) throw new Error("Email tidak boleh kosong");
        if (!password) throw new Error("Password tidak boleh kosong");
        const isEmail = validateEmail(newUser.email);
        if (!isEmail) throw new Error("Email tidak sesuai format");
        if (password.length < 5)
          throw new Error("Password harus lebih dari 5 huruf");

        const accessToken = await User.login(email, password);
        return { accessToken };
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
    findById: async (_, args) => {
      try {
        const { id } = args;
        const user = await User.findById(username);
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
        if (!newUser.email) throw new Error("Email tidak boleh kosong");
        if (!newUser.password) throw new Error("Password tidak boleh kosong");
        const isEmail = validateEmail(newUser.email);
        if (!isEmail) throw new Error("Email tidak sesuai format");
        if (newUser.password.length < 5)
          throw new Error("Password harus lebih dari 5 huruf");
        const users = await User.findAll();
        const isEmailUnique = users.filter((x) => x.email === newUser.email);
        if (isEmailUnique.length > 0) throw new Error("Email telah terdaftar");

        newUser.password = hashPassword(newUser.password);
        const user = await User.register(newUser);
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
