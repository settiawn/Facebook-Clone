const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const followDB = database.collection("Follow");

module.exports = class Follow {
  static async add(id, userId) {
    const follow = {
      followingId: new ObjectId(String(id)),
      followerId: new ObjectId(String(userId)),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const data = await followDB
      .find({ followerId: new ObjectId(String(userId)) })
      .toArray();

    const validate = data.filter((x) => x.followingId == id);
    if (validate.length > 0) throw new Error("You already follow this user");

    await followDB.insertOne(follow);
    return {
      ...follow,
    };
  }
};
