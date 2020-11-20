const mongoose = require('mongoose');

const resolvers = {
  Query: {
    shows: (_, args, {Show}) => Show.find(),
  },
  Mutation: {
    createShow: async (_,{name, genre}, {Show}) => {
      const show = new Show({ showId: null , name, genre });
      await show.save();
      show.showId = show._id;
      await show.save();
      return show;
    },
    deleteShow: async (_, {showId}, {Show}) => {
      const show = await Show.findOne({showId})
      await Show.deleteOne({showId})
      return show
    },
    deleteAllShows: async(_, args, {Show}) => {
      const shows = await Show.find()
      await Show.deleteMany({})
      return shows
    }
  }
};

module.exports = resolvers;