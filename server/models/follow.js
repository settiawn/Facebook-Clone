const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const followDB = database.collection("Follow");

module.exports = class Follow {
  static async add(id, userId) {
    const follow = {
      followingId: new ObjectId(String(id)),
      followerId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await followDB.insertOne(follow);
    return {
      ...follow,
    };
  }
};
