const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    watchedMovies: [Movie]
    watchlist: [Movie]
    reviews: [Review]
    followings: [User]
    followers: [User]
  }
  input CreateUserInput {
    email: String!
    username: String!
    password: String!
  }
  input DeleteUserInput {
    id: ID!
    password: String!
  }
  type Movie {
    movieId: ID!
    title: String
    releaseYear: String
    imageURL: String
    overview: String
    reviews: [Review]
  }
  input MovieInput {
    movieId: ID!
    title: String
    releaseYear: String
    imageURL: String
    overview: String
  }
  type Review {
    id: ID!
    movieId: String!
    createdAt: String
    user: User
    movie: Movie
    reviewText: String!
    reviewAuthor: String!
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    user(username: String!): User 
    users: [User]

    review(reviewId: ID!): Review
    reviews(username: String): [Review]
    protected: User
    movie(id: ID!): Movie
  }

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    deleteUser(id: ID!, input: DeleteUserInput!): User
    addFollower(userId: String!, followedUserId: String): User!
    unfollow(userId: String!, followedUserId: String): User!
    ## updateUser(id: ID!, input: UpdateUserInput!): User!
    loginUser(email: String!, password: String!): Auth
    addWatchedMovie(movie: MovieInput!): User
    addMovieToWatchlist(movie: MovieInput): User!
    removeWatchedMovie(input: MovieInput): User
    removeMovieFromWatchlist(input: MovieInput): User
    createReview(reviewText: String!): Review
    addReview(reviewId: ID!, reviewText: String!): Review
  }
`;
// , reviewAuthor: String!
module.exports = typeDefs;