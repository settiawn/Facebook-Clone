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
    getPosts : [Post]
    getPostById(id: String) : Post

  }

  type Mutation {
    createPost(newPost: newPost): Post
    likePost(id: String) : Post
    commentPost(id: String, content: String) : Post
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      const result = await Posts.findAll();
      return result;
    },
    getPostById: async (_, args) => {
      const { id } = args;
      const result = await Posts.findById(id);
      return result;
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      const user = context.auth();
      const post = { ...args.newPost };
      post.authorId = user.id;
      post.comments = post.likes = [];
      post.createdAt = post.updatedAt = new Date();
      const result = await Posts.addPost(post);
      return result;
    },
    likePost: async (_, args, context) => {
      const { id } = args;
      const user = context.auth();
      await Posts.likePost(id, user.username);
      const result = await Posts.findById(id);
      return result;
    },
    commentPost: async (_, args, context) => {
      const { id, content } = args;
      const user = context.auth();
      await Posts.commentPost(id, user.username, content);
      const result = await Posts.findById(id);
      return result;
    },
  },
};

module.exports = { typeDefs, resolvers };
