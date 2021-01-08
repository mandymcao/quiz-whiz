const { gql } = require('apollo-server');

const showTypeDefs = gql`
  type Show {
    showId: ID!
    name: String!
    genre: String
  }

  type Query {
    show(showId: ID!): Show
    shows(name: String, genre: String): [Show]!
  }

  type Mutation {
    addWatchedShow(showId: ID!): User
    removeWatchedShow(showId: ID!): User
    addShowToReview(showId: ID!): User
    removeShowToReview(showId: ID!): User
    createShow(name: String!, genre: String): Show
    deleteShow(showId: ID!): Show
    deleteAllShows: [Show]
  }
`;

module.exports = showTypeDefs;