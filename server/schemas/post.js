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
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      return "ok";
    },
    getPostById: async (_, args) => {
      return "ok";
    },
  },
  Mutation: {
    createPost: async (_, args) => {
      const post = {...args.newPost}
      const result = Posts.addPost(post);
      return "ok";
    },
  },
};

module.exports = { typeDefs, resolvers };
