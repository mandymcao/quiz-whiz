const { gql } = require('apollo-server');

const quizTypeDefs = gql`
  type Quiz {
    quizId: ID!
    name: String!
    show: Show
    genre: String
    questions: [Question]!
    createdAt: Date
    createdBy: User
  }

  type Query {
    quizzes(name: String, genre: String): [Quiz]!
    quiz(id: ID!): Quiz
  }

  type Mutation {
    createQuiz(name: String!, showId: ID, genre: String): Quiz
    deleteQuiz(quizId: ID!): Quiz
    modifyQuizInfo(quizId: ID!, name: String, showId: ID, genre: String): Quiz
  }
`;

module.exports = quizTypeDefs;