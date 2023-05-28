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
    movieId: ID
    title: String
    releaseYear: String
    imageURL: String
    overview: String
  }
  input MovieInput {
    movieId: ID
    title: String
    releaseYear: String
    imageURL: String
    overview: String
  }
  type Review {
    reviewId: ID
    createdAt: String
    reviewText: String
    reviewAuthor: String
    movieTitle: Movie
  }

  input ReviewInput {
    reviewId: ID
    createdAt: String
    reviewText: String
    reviewAuthor: String
    movieTitle: MovieInput
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    user(username: String!): User 
    users: [User]
    review(id: ID!): Review
    # reviews(username: String): [Review]
    protected: User
    movie(id: ID!): Movie
  }

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    deleteUser(id: ID!, input: DeleteUserInput!): User
    ## updateUser(id: ID!, input: UpdateUserInput!): User!
    loginUser(email: String!, password: String!): Auth
    addWatchedMovie(movie: MovieInput!): User
    addMovieToWatchlist(movie: MovieInput): User!
    removeWatchedMovie(input: MovieInput): User
    removeMovieFromWatchlist(input: MovieInput): User
    createReview(review: ReviewInput, movieTitle: MovieInput): User
  }
`;
// , reviewAuthor: String!
// addReview(reviewId: ID!, reviewText: String!): Review

module.exports = typeDefs;