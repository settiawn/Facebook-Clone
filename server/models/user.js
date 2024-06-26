const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const userDB = database.collection("User");

module.exports = class User {
  static async register(newUser) {
    console.log(newUser);
    const result = await userDB.insertOne(newUser);
    delete newUser.password
    let createdUser = {
      _id: result.insertedId,
      ...newUser,
    };
    return createdUser;
  }

  static async findAll() {
    const options = {
      sort: { name: 1 },
      projection: { password: 0 },
    };
    const result = await userDB.find({}, options).toArray();
    return result; //butuh aggregate
  }

  static async login(email, password) {
    const user = await userDB.findOne({ email });
    if (!user) throw new Error("Email/Password salah");
    const verifyPass = comparePassword(password, user.password);
    if (!verifyPass) throw new Error("Email/Password salah");

    const token = signToken({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    const result = {id: user._id, accessToken: token}
    return result;
  }

  static async findUser(input) {
    const regex = new RegExp(input, "i");
    const user = await userDB.find({ name: { $regex: regex } }).toArray();
    if (!user) throw new Error("User tidak ditemukan");
    return user;
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
          from: "Follow",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "Follow",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "User",
          localField: "following.followingId",
          foreignField: "_id",
          as: "followingDetails",
        },
      },
      {
        $lookup: {
          from: "User",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "followerDetails",
        },
      },
      {
        $project: {
          password: 0,
          "followingDetails.password": 0,
          "followerDetails.password": 0,
        },
      },
    ];

    //! aggregate findbyId
    const [user] = await userDB.aggregate(agg).toArray();
    console.log(user);
    // const user = await userDB.findOne({ _id: new ObjectId(String(id)) });
    if (!user) throw new Error("User tidak ditemukan");
    return user;
  }
};
