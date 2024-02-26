const { database } = require("../config/mongodb")

module.exports = class User {
    static async create(newUser){
        const userDB = database.collection("User")
        const result = await userDB.insertOne(newUser)
        let createdUser = {
            _id: result.insertedId,
            ...newUser
        }
        return createdUser
    }
}