
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const Attempt = require('./models/attempt');
const Question = require('./models/question');
const Quiz = require('./models/quiz');
const Show = require('./models/show');
const User = require('./models/user');

var mongoose = require('mongoose');

const startServer = async() => {
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: async ({req}) => {
      const auth = (req.headers && req.headers.authorization) || ''
      const user = auth ? await User.findOne({token: auth}) : null

      return {
        Attempt, Question, Quiz, Show, User, user
      }
    }
  });

  await mongoose.connect('mongodb://localhost/test5', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

}

startServer();

