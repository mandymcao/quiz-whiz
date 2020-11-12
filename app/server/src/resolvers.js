const Show = require('./models/show');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
      shows: () => Show.find(),
    },
    Mutation: {
        createShow: async (_,{name, genre}) => {
            const show = new Show({ showId: null , name, genre });
            await show.save();
            show.showId = show._id;
            await show.save();
            return show;
        }
    }
  };

  module.exports = resolvers;