const books = [
  {
    id: 1,
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: 2,
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = `#graphql
    # model
  type Book {
    id: ID
    title: String
    author: String
  }

    # endpoints
  type Query {
    books: [Book]
    bookById(id: ID!): Book
  }
`;

//controller
const resolvers = {
  Query: {
    books: () => books,
    bookById: (_, args) => {
      console.log(args);
      console.log(books);
      return books.find((b) => b.id == args.id);
    },
  },
};

module.exports = { typeDefs, resolvers };
