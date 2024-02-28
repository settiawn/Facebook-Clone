const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const postDB = database.collection("Posts");

module.exports = class Posts {
  static async addPost(newPost) {
    await postDB.insertOne(newPost);
    return {
      ...newPost,
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
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "User",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "author.password": 0,
        },
      },
    ];
    const [result] = await postDB.aggregate(agg).toArray();
    console.log(result);
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
