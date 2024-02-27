const { database } = require("../config/mongodb");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const userDB = database.collection("User");

module.exports = class User {
  static async create(newUser) {
    const result = await userDB.insertOne(newUser);
    let createdUser = {
      _id: result.insertedId,
      ...newUser,
    };
    return createdUser;
  }

  static async findAll() {
    const options = {
      sort: { name: 1 },
      projection: { _id: 0 },
    };
    const result = await userDB.find({}, options).toArray();
    return result;
  }

  static async getUser(email, password) {
    const user = await userDB.findOne({ email });
    if (!user) throw new Error("Email/Password salah");
    const verifyPass = comparePassword(password, user.password);
    if (!verifyPass) throw new Error("Email/Password salah");

    const token = signToken({ id: user._id, email: user.email });
    return token;
  }

  static async findUser(username) {
    const user = await userDB.findOne({ username });
    if (!user) throw new Error("User tidak ditemukan");
    return user;
  }
};