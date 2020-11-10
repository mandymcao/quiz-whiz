
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');

const shows = [
  {
    showId: 1,
    name: "The Office",
    genre: "Michael Scott",
  },
  {
    showId: 2,
    name: "One Piece",
    genre: "anime",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    shows: () => shows,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});



