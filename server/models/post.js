const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const postDB = database.collection("Posts");

module.exports = class Posts {
  static async addPost(newPost) {
    const result = await postDB.insertOne(newPost);
    return {
      ...newPost,
      id: result.insertedId,
    };
  }

  static async findAll() {
    const options = {
      sort: { createdAt: -1 },
    };
    const result = await postDB.find({}, options).toArray();
    return result;
  }

  static async findById(id) {
    const [result] = await postDB
      .find({ _id: new ObjectId(String(id)) })
      .toArray();
    return result;
  }

  static async likePost(id, username) {
    const [post] = await postDB
      .find({ _id: new ObjectId(String(id)) })
      .toArray();

    const validate = post.likes.filter((x) => x.username === username);
    if (validate.length > 0) return null;
    const like = { username, createdAt: new Date(), updatedAt: new Date() };
    await postDB.updateOne(
      { _id: new ObjectId(String(id)) },
      { $addToSet: { likes: like } }
    );
    return null;
  }

  static async commentPost(id, username, content) {
    const comment = {
      username,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await postDB.updateOne(
      { _id: new ObjectId(String(id)) },
      { $addToSet: { comments: comment } }
    );
    return null;
  }
};
