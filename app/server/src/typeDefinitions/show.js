const { gql } = require('apollo-server');

const showTypeDefs = gql`
  type Show {
    showId: ID!
    name: String!
    genre: String
  }

  type Query {
    show(id: ID!): Show
    shows(name: String, genre: String): [Show]!
  }

  type Mutation {
    addShow(showId: ID!, userId: ID!): User
    removeShow(showId: ID!, userId: ID!): User
    createShow(name: String!, genre: String): Show
    deleteShow(showId: ID!): Show
    deleteAllShows: [Show]
  }
`;

module.exports = showTypeDefs;