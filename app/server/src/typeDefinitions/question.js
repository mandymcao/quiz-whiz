const { gql } = require('apollo-server');

const questionTypeDefs = gql`
  type Question {
    questionId: ID!
    quiz: Quiz!
    question: String!
    answer: String!
    options: [String]
  }

  type Mutation {
    addQuestion(quizId: ID!, question: String!, answer: String!, options: [String]!): Question
    modifyQuestion(quizId: ID!, questionId: ID!, question: String!, answer: String!, options: [String]!): Question
    removeQuestion(questionId: ID!): Question
  }
`;

module.exports = questionTypeDefs;