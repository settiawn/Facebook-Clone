const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const redis = require("../config/redis");
const postDB = database.collection("Posts");

module.exports = class Posts {
  static async addPost(newPost) {
    await postDB.insertOne(newPost);
    await redis.del("posts:all");
    return {
      ...newPost,
    };
  }

  static async findAll() {
    const agg = [
      {
        '$lookup': {
          'from': 'User', 
          'localField': 'authorId', 
          'foreignField': '_id', 
          'as': 'author'
        }
      }, {
        '$unwind': {
          'path': '$author', 
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$project': {
          'author.password': 0
        }
      }, {
        '$sort': {
          'createdAt': -1
        }
      }
    ];
    
    const postCache = await redis.get("posts:all");
    if (postCache) {
      const data = JSON.parse(postCache);
      return data;
    }

    const result = await postDB.aggregate(agg).toArray();
    await redis.set("posts:all", JSON.stringify(result));

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
    await redis.del("posts:all");
    const [post] = await postDB
      .find({ _id: new ObjectId(String(id)) })
      .toArray();
    if (!post) throw new Error("Post not found");

    const validate = post.likes.filter((x) => x.username === username);
    if (validate.length > 0) throw new Error("You already liked this post");

    const like = { username, createdAt: new Date(), updatedAt: new Date() };
    await postDB.updateOne(
      { _id: new ObjectId(String(id)) },
      { $addToSet: { likes: like } }
    );
    return null;
  }

  static async commentPost(id, username, content) {
    await redis.del("posts:all");
    const comment = {
      username,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [post] = await postDB
      .find({ _id: new ObjectId(String(id)) })
      .toArray();
    if (!post) throw new Error("Post not found");

    await postDB.updateOne(
      { _id: new ObjectId(String(id)) },
      { $addToSet: { comments: comment } }
    );
    return null;
  }
};
