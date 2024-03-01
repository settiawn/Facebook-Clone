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
  }

  type UserDetail {
    _id: ID
    name: String
    username: String!
    email: String!
    followers : [Follow]
    following : [Follow]
    followerDetails : [User]
    followingDetails : [User]
  }

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
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
    findUserByName(input: String): [User]
    findUserById(id: String): UserDetail
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
        const isEmail = validateEmail(email);
        if (!isEmail) throw new Error("Email tidak sesuai format");
        if (password.length < 5)
          throw new Error("Password harus lebih dari 5 huruf");

        const accessToken = await User.login(email, password);
        return { accessToken };
      } catch (error) {
        throw error;
      }
    },
    findUserByName: async (_, args, context) => {
      try {
        context.auth();
        const { input } = args;
        const user = await User.findUser(input);
        return user;
      } catch (error) {
        throw error;
      }
    },
    findUserById: async (_, args, context) => {
      try {
        context.auth();
        const { id } = args;
        const user = await User.findById(id);
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
        const users = await User.findAll(); ///findOne
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
