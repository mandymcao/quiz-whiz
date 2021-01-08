const { gql } = require('apollo-server');

const userTypeDefs = gql`
  type User {
    userId: ID!
    email: String!
    password: String!
    quizzesOwned: [Quiz]!
    attemptsTaken: [Attempt]!
    shows: [Show]!
    showsToReview: [Show]!
    admin: Boolean!
    token: String
  }

  type Attempt {
    attemptId: ID!
    quiz: Quiz!
    user: User!
    score: Score!
    message: ResultMessage
    createdAt: Date!
    submitted: Boolean!
  }

  enum ResultMessage { 
    FAIL
    MARGINAL
    SATISFACTORY
    GOOD
    VERYGOOD
    PERFECT
  }

  type Score {
    pointsEarned: Int!
    total: Int!
  }

  type Query {
    me: User
    allUsers: [User]!
    attempt(attemptId: ID!): Attempt
  }

  type Mutation {
    login(email: String, password: String): User # String login token
    startAttempt(quizId: ID!): Attempt
    updateAttempt(attemptId: ID!, questionId: ID!, userAnswer: String!): Attempt
    submitAttempt(attemptId: ID!): Attempt
  }
`;

module.exports = userTypeDefs;