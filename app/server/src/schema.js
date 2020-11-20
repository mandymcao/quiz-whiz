const { gql } = require('apollo-server');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const questionTypeDefs = require('./typeDefinitions/question');
const quizTypeDefs = require('./typeDefinitions/quiz');
const showTypeDefs = require('./typeDefinitions/show');
const userTypeDefs = require('./typeDefinitions/user');
const scalarTypeDefs = require('./typeDefinitions/scalarTypes');

const types = [
  questionTypeDefs,
  quizTypeDefs,
  showTypeDefs,
  userTypeDefs,
  scalarTypeDefs,
];

const typeDefs = mergeTypeDefs(types);
module.exports = typeDefs;
