const { ObjectId } = require("mongodb");
const Posts = require("../models/post");

const typeDefs = `#graphql
    type Post {
        _id: ID
        content: String!
        tags: [String]
        imgUrl: String
        authorId: ID!
        comments: [Comments]
        likes: [Likes]
        createdAt: String
        updatedAt: String
        author: User
    }

    type User {
    _id: ID
    name: String
    username: String!
    email: String!
  }

    type Comments {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Likes {
        username: String!
        createdAt: String
        updatedAt: String
    }

    input newPost {
        content: String
        tags: [String]
        imgUrl: String
    }

  type Query {
    getAllPosts : [Post]
    getPostById(id: String) : Post

  }

  type Mutation {
    createPost(newPost: newPost): Post
    likePost(postId: String) : Post
    commentPost(postId: String, content: String) : Post
  }
`;

const resolvers = {
  Query: {
    getAllPosts: async (_, args, context) => {
      //! dari yang terbaru (done)
      try {
        context.auth();
        const result = await Posts.findAll();
        return result;
      } catch (error) {
        throw error;
      }
    },
    getPostById: async (_, args, context) => {
      try {
        context.auth();
        const { id } = args;
        const result = await Posts.findById(id);
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      try {
        const user = context.auth();
        const post = { ...args.newPost };
        post.authorId = new ObjectId(String(user.id));
        post.comments = post.likes = [];
        post.createdAt = post.updatedAt = new Date();
        const result = await Posts.addPost(post);
        return result;
      } catch (error) {
        throw error;
      }
    },
    likePost: async (_, args, context) => {
      try {
        const { postId } = args;
        const user = context.auth();
        await Posts.likePost(postId, user.username);
        const result = await Posts.findById(postId);
        console.log(result);
        return result;
      } catch (error) {
        throw error;
      }
    },
    commentPost: async (_, args, context) => {
      try {
        const { postId, content } = args;
        const user = context.auth();
        await Posts.commentPost(postId, user.username, content);
        const result = await Posts.findById(postId);
        return result;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
