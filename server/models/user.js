const { database } = require("../config/mongodb");
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
    const result = await userDB.find({}, options).toArray()
    return result;
  }
};
