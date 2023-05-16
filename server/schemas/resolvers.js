//!Makes sure the user must be logged in to post a review  //!Will add more models when we hash them out in queries and mutations

const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Review, Movie } = require("../models"); //we don't need to do the dataSource at all if we import all the models
// const { ObjectId } = require("mongodb"); //! for review as of now

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      return await User.findOne({ username });
    },
    users: async (_, __, context) => {
      return await User.find();
    },
    // review: async (parent, { reviewId }) => {
    //   return Review.findOne({ _id: reviewId });
    // },
    // reviews: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Review.find(params).sort({ createdAt: -1 });
    // },
    review: async (_, { id }, context) => {
      return await Review.add(id);
    },
    movie: async (_, { id }, context) => {
      return await Movie.getMovieById(id);
    },
    protected: async (parent, args, context) => {
      //!Query defined in typeDef for authentication
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        console.log(context.user);
        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    createUser: async (parent, { input }) => {
      console.log(input);
      const user = await User.create(input);
      const token = signToken(user);

      return { token, user };
    },

    loginUser: async (parent, { email, password }) => {
      // console.log(context);
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      console.log(user);
      if (user.id) {
        const token = signToken(user);
        return { token, user };
      }
    },

    deleteUser: async (parent, { password }, { user }) => {
      // Check if user is logged in
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // Find user by ID and delete
      const deletedUser = await User.findByIdAndDelete(user._id); //!pass id from user

      // If user is not found, throw an error
      if (!deletedUser) {
        throw new AuthenticationError("User not found.");
      }
      console.log(deletedUser.username);
      return deletedUser;
    },
    removeWatchedMovie: async (parent, { movie, input }, context) => {
      if (context.user) {
        console.log(input);

        const dataMovie = await User.findOneAndUpdate(
          { movie },
          { $pull: { watchedMovies: { _id: context.user._id, input } } },
          { new: true, runValidators: true }
        ).populate(watchedMovies);

        return dataMovie;
      }
      throw new AuthenticationError("must be logged in to perform this action");
    },
    addWatchedMovie: async (parent, { movie }, context) => {
      if (context.user) {
        return (updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { watchedMovies: movie } },
          { new: true, runValidators: true }
        ).populate("watchedMovies"));
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeWatchedMovie: async (parent, { input }, context) => {
      if (context.user) {
        const { movieId } = input;
        return (updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { watchedMovies: { movieId: movieId } } },
          { new: true }
        ));
      }
      throw new AuthenticationError("must be logged in to perform this action");
    },

    addMovieToWatchlist: async (parent, { movie }, context) => {
      if (context.user) {
        return (updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { watchlist: movie } },
          { new: true, runValidators: true }
        ));
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeMovieFromWatchlist: async (parent, { input }, context) => {
      if (context.user) {
        const { movieId } = input;
        return (updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { watchlist: { movieId: movieId } } },
          { new: true }
        ));
      }
      throw new AuthenticationError("must be logged in to perform this action");
    },

    createReview: async (parent, { review }, context) => {
    if (context.user) {
      const reviewWithId = {
        reviewId: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ...review,
      };

  //   return (updatedUser = await User.findOneAndUpdate(
  //     { _id: context.user._id },
  //     { $addToSet: { reviews: reviewWithId } },
  //     { new: true, runValidators: true }
  //   ));
  // }

  const updatedUser = await User.findOneAndUpdate(
    { _id: context.user._id },
    { $addToSet: { reviews: reviewWithId } },
    { new: true, runValidators: true }
  );

  return { ...updatedUser._doc, reviews: [reviewWithId] };
}

// const updatedUser = await User.findOneAndUpdate(
//   { _id: context.user._id },
//   { $addToSet: { reviews: reviewWithId } },
//   { new: true, runValidators: true }
// ).select('_id'); // Add '.select("_id")' to include the 'id' field in the returned user object

// return updatedUser;
// }

      throw new AuthenticationError("You need to be logged in!");
    },

    // createReview: async (parent, { reviewText }, context) => {
    //   // if (context.user) {
    //   //   const review = await Review.create({
    //   //     reviewText,
    //   //     reviewAuthor: context.user.username,
    //   //   })
    //   if (context.user) {
    //     const review = await Review.create({
    //       reviewText,
    //       user: context.user._id, // Assign the user ID to the user field
    //       reviewAuthor: context.user.username,
    //     });

    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { reviews: review._id } }
    //     )

    //     review.reviewAuthor = context.user.username; // Set the reviewAuthor field

    //     return review
    //   }
    //   throw new AuthenticationError('You need to be logged in!')
    // },

    // addReview: async (parent, { reviewId, reviewText }, context) => {
    //   if (context.user) {
    //     // await Review.create({ reviewId })
    //     const reviewUser = await User.findOneAndUpdate(
    //       reviewId,
    //       { _id: context.user },
    //       {
    //         $addToSet: { reviews: { reviewText, reviewAuthor: context.user } },
    //       },
    //       { new: true, runValidators: true }
    //     );
    //     console.log(reviewId);
    //     return reviewUser;
    //   }
    //   if (!context.user) {
    //     throw new AuthenticationError("You need to be logged in!");
    //   }
    // },
  },
};
module.exports = resolvers;

// const newReview = {
//   reviewText,
//   reviewAuthor: context.user.username
// };

//   // Find the movie by its movieId and push the new review into the reviews array
//   const updatedMovie = await Movie.findOneAndUpdate(
//     { movieId: movieId },
//     { $push: { reviews: newReview } },
//     { new: true }
//   );

//   return updatedMovie;
