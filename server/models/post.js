const { database } = require("../config/mongodb");
const postDB = database.collection("Posts");

module.exports = class Posts{
    static async addPost(newPost){
        console.log(newPost);
        return "OK"
    }
}