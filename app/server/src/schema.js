const { gql } = require('apollo-server');
// const { mergeTypeDefs } = require('@graphql-tools/merge');

// const launchTypeDefs = require('./typeDefinitions/launch');
// const userTypeDefs = require('./typeDefinitions/user');

// const types = [
//   launchTypeDefs,
//   userTypeDefs,
// ];

// const typeDefs = mergeTypeDefs(types);

const typeDefs = gql`
    # https://www.apollographql.com/docs/apollo-server/schema/scalars-enums/#date-as-a-scalar
    scalar Date

    type Quiz {
        quizId: ID!
        name: String!
        show: Show
        genre: String
        questions: [Question]!
    }
    
    type Question {
        questionId: ID!
        quiz: Quiz!
      question: String!
      answer: String!
      options: [String]
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

    type Show {
      showId: ID!
      name: String!
      genre: String
    }

    type User {
        userId: ID!
        email: String!
        password: String!
        quizzesOwned: [Quiz]!
        quizzesTaken: [Attempt]!
        shows: [Show]!
        showsToReview: [Show]!
        admin: Boolean!
    }

    type Query {
        quizzes(name: String, genre: String): [Quiz]!
        quiz(id: ID!): Quiz
        show(id: ID!): Show
        shows(name: String, genre: String): [Show]!
        attempt(attemptId: ID!): Attempt
        me: User
    }
    
    type Mutation {
        createQuiz(name: String!, showId: ID, genre: String): Quiz
        deleteQuiz(quizId: ID!): Quiz
        modifyQuizInfo(quizId: ID!, name: String, showId: ID, genre: String): Quiz
        addQuestion(quizId: ID!, question: String!, answer: String!, options: [String]!): Question
        modifyQuestion(quizId: ID!, questionId: ID!, question: String!, answer: String!, options: [String]!): Question
        removeQuestion(questionId: ID!): Question
        addShow(showId: ID!, userId: ID!): User
        removeShow(showId: ID!, userId: ID!): User
        createShow(name: String!, genre: String): Show
        deleteShow(showId: ID!): Show
        startAttempt(quizId: ID!, userId: ID!): Attempt
        updateAttempt(attemptId: ID!, questionId: ID!, userAnswer: String!): Attempt
        submitAttempt(attemptId: ID!): Attempt
        login(email: String): String # login token
    }
      
  
`;

module.exports = typeDefs;