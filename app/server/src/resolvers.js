const mongoose = require('mongoose');
const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')

const resolvers = {
  User: {
    quizzesOwned: async ({userId}, _, {Quiz}) => {
      try {
        return await Quiz.find({createdBy: userId})
      } catch (err) {
        console.log(err)
      }
    },
    attemptsTaken: async ({userId}, _, {Attempt}) => {
      try {
        return await Attempt.find({userId})
      } catch (err) {
        console.log(err)
      }
    },
    shows: async ({showIds}, _, {Show}) => {
      try {
        return await Show.find({showId: {$in: showIds}})
      } catch (err) {
        console.log(err)
      }
    },
    showsToReview: async ({showsToReviewIds}, _, {Show}) => {
      try {
        return await Show.find({showId: {$in: showsToReviewIds}})
      } catch (err) {
        console.log(err)
      }
    },
  },

  Attempt: {
    quiz: async ({quizId}, _, {Quiz}) => {
      try {
        return await Quiz.findOne({quizId})
      } catch (err) {
        console.log(err)
      }
    },
    user: async ({userId}, _, {User}) => {
      try {
        return await User.findOne({userId})
      } catch (err) {
        console.log(err)
      }
    },
  },

  Quiz: {
    show: async ({showId}, _, {Show}) => {
      try {
        return await Show.findOne({showId})
      } catch (err) {
        console.log(err)
      }
    },
    questions: async ({quizId}, _, {Question}) => {
      try {
        return await Question.find({quizId})
      } catch (err) {
        console.log(err)
      }
    },
    createdBy: async ({createdBy}, _, {User, user: {userId}}) => {
      try {
        return await User.findOne({userId: createdBy})
      } catch (err) {
        console.log(err)
      }
    },
  },

  Question: {
    quiz: async ({quizId}, _, {Quiz}) => {
      try {
        return await Quiz.findOne({quizId})
      } catch (err) {
        console.log(err)
      }
    },
  },

  Query: {
    shows: async (_, {name, genre}, {Show}) => {
      try {
        let showQuery = {}
        if (name) 
          showQuery.name = name
        if (genre)
          showQuery.genre = genre
        return Show.find(showQuery)
      } catch (err) {
        console.log(err)
      }
    },
    show: async (_, {showId}, {Show}) => {
      try {
        return await Show.findOne(showId)
      } catch (err) {
        console.log(err)
      }
    },
    me: (_, args, {user}) => user,
    allUsers: async (_, args, {User}) => {
      try {
        return await User.find()
      } catch (err) {
        console.log(err)
      }
    },
    attempt: async (_, {attemptId}, {Attempt}) => {
      try {
        return await Attempt.findOne({attemptId})
      } catch (err) {
        console.log(err)
      }
    },
    quizzes: async (_, {name, genre}, {Quiz}) => {
      try {
        let quizQuery = {}
        if (name) 
          quizQuery.name = name
        if (genre)
          quizQuery.genre = genre
        return await Quiz.find(quizQuery)
      } catch (err) {
        console.log(err)
      }
    },
    quiz: async (_, {quizId}, {Quiz}) => {
      try {
        return await Quiz.findOne({quizId})
      } catch (err) {
        console.log(err)
      }
    },
  },

  Mutation: {
    addWatchedShow: async (_, {showId}, {User, user: {userId}}) => {
      try {
        const user = await User.findOne({userId})
        if (!(user.showIds).includes(showId)) {
          user.showIds.push(showId)
          await user.save()
        }
        return user
      } catch (err) {
        console.log(err)
      }
    },
    removeWatchedShow: async (_, {showId}, {User, user: {userId}}) => {
      try {
        const user = await User.findOne({userId})
        const index = user.showIds.indexOf(showId)
        if (index > -1) {
          user.showIds.splice(index, 1)
          await user.save()
        }
        return user
      } catch (err) {
        console.log(err)
      }
    },
    addShowToReview: async (_, {showId}, {User, user: {userId}}) => {
      try {
        const user = await User.findOne({userId})
        if (!(user.showsToReviewIds).includes(showId)) {
          user.showsToReviewIds.push(showId)
          await user.save()
        }
        return user
      } catch (err) {
        console.log(err)
      }
    },
    removeShowToReview: async (_, {showId}, {User, user: {userId}}) => {
      try {
        const user = await User.findOne({userId})
        const index = user.showsToReviewIds.indexOf(showId)
        if (index > -1) {
          user.showsToReviewIds.splice(index, 1)
          await user.save()
        }
        return user
      } catch (err) {
        console.log(err)
      }
    },
    createShow: async (_,{name, genre}, {Show}) => {
      try {
        const show = new Show({ name, genre });
        await show.save();
        return show;
      } catch (err) {
        console.log(err)
      }
    },
    deleteShow: async (_, {showId}, {Show}) => {
      try {
        const show = await Show.findOne({showId})
        await Show.deleteOne({showId})
        return show
      } catch (err) {
        console.log(err)
      }
    },
    deleteAllShows: async (_, args, {Show}) => {
      try {
        const shows = await Show.find()
        await Show.deleteMany({})
        return shows
      } catch (err) {
        console.log(err)
      }
    },
    login: async (_, {email, password}, {User}) => {
      try {
        var user = await User.findOne({email})
        if (!user) {
          user = new User({email, password})
        } else if (user.password != password) {
          return null
        }
        user.token = randomToken(16)
        await user.save()
        return user
      } catch (err) {
        console.log(err)
      }
    },
    startAttempt: async (_, {quizId}, {Attempt, User, Quiz, user: {userId}}) => {
      try {
        const quiz = await Quiz.findOne({quizId})
        // create attempt
        const attempt = new Attempt({
          quizId, userId, message: null,
          score: { pointsEarned: 0, total: quiz.totalQuestions },
        })
        await attempt.save()

        return attempt
      } catch (err) {
        console.log(err)
      }
    },
    updateAttempt: async (_, {attemptId, questionId, userAnswer}, {Attempt, Question}) => {
      try {
        const attempt = await Attempt.findOne({attemptId})
        const question = await Question.findOne({questionId})
        if (userAnswer == question.answer) {
          attempt.score.pointsEarned == attempt.score.pointsEarned + 1
          await attempt.save()
        }
        return attempt
      } catch (err) {
        console.log(err)
      }
    },
    submitAttempt: async (_, {attemptId}, {Attempt}) => {
      try {
        const attempt = await Attempt.findOne({attemptId})
        attempt.submitted = true
        const score = attempt.score.pointsEarned / attempt.score.total
        if (score == 1) {
          attempt.message = 'PERFECT'
        } else if (score >= 0.9) {
          attempt.message = 'VERYGOOD'
        } else if (score >= 0.8) {
          attempt.message = 'GOOD'
        } else if (score >= 0.7) {
          attempt.message = 'SATISFACTORY'
        } else if (score >= 0.5) {
          attempt.message = 'MARGINAL'
        } else {
          attempt.message = 'FAIL'
        }
        await attempt.save()
        return attempt
      } catch (err) {
        console.log(err)
      }
    },

    createQuiz: async (_, {name, showId, genre}, {Quiz, user: {userId}}) => {
      try {
        const quiz = new Quiz({ name, showId, genre, createdBy: userId })
        await quiz.save()
        return quiz
      } catch (err) {
        console.log(err)
      }
    },
    deleteQuiz: async (_, {quizId}, {Quiz, Attempt, Question}) => {
      try {
        const quiz = await Quiz.findOne({quizId})
        if (quiz) {
          // delete all quiz attempts
          await Attempt.deleteMany({quizId})
          // delete all quiz questions
          await Question.deleteMany({quizId})
          // delete quiz
          await Quiz.deleteOne({quizId})
        }
        return quiz
      } catch (err) {
        console.log(err)
      }
    },
    modifyQuizInfo: async (_, {quizId, name, showId, genre}, {Quiz}) => {
      try {
        const quiz = await Quiz.findOne({quizId})
        if (name) 
          quiz.name = name
        if (showId)
          quiz.showId = showId
        if (genre)
          quiz.genre = genre
        await quiz.save()
        return quiz
      } catch (err) {
        console.log(err)
      }
    },
    publishQuiz: async(_, {quizId}, {Quiz}) => {
      try {
        const quiz = await Quiz.findOne({quizId})
        quiz.published = true
        await quiz.save()
        return quiz
      } catch(err) {
        console.log(err)
      }
    },

    addQuestion: async (_, {quizId, question: questionString, answer, options}, {Question, Quiz}) => {
      try {
        const question = new Question({ quizId, question: questionString, answer, options })
        await question.save()
        const quiz = await Quiz.findOne({quizId})
        quiz.totalQuestions = quiz.totalQuestions + 1
        await quiz.save()
        return question
      } catch (err) {
        console.log(err)
      }
    },
    modifyQuestion: async (_, {quizId, questionId, question: questionString, answer, options}, {Question}) => {
      try {
        const question = await Question.findOne({questionId})
        question.quizId = quizId
        question.question = questionString
        question.answer = answer
        question.options = options
        await question.save()
        return question
      } catch (err) {
        console.log(err)
      }
    },
    removeQuestion: async (_, {questionId}, {Question}) => {
      try {
        const question = await Question.findOne({questionId})
        await Question.deleteOne({questionId})
        return question
      } catch (err) {
        console.log(err)
      }
    }
  }
};

module.exports = resolvers;