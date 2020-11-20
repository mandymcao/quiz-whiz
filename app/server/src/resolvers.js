const mongoose = require('mongoose');
const User = require('./models/user');

const resolvers = {
  Query: {
    shows: (_, args, {Show}) => Show.find(),
    allUsers: (_, args, {User}) => User.find()
  },
  Mutation: {
    addShow: async (_, {showId, userId}, {Show, User}) => {
      const user = await User.findOne({userId})
      if (!(user.showIds).includes(showId)) {
        user.showIds.push(showId)
        await user.save()
      }
      return user
    },
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
    },
    login: async(_, {email, password}, {User}) => {
      var user = await User.findOne({email})
      if (!user) {
        user = new User({email, password})
        await user.save()
      }
      return user
    }
  }
};

module.exports = resolvers;