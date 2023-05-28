import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    id
    username
    email
    watchlist {
      movieId
      title
      releaseYear
      imageURL
      overview
    }
    watchedMovies {
      movieId
      title
      releaseYear
      imageURL
      overview
    }
    reviews {
      reviewId
      reviewText
      reviewAuthor
      createdAt
    }
  }
}
`;

// export const QUERY_REVIEWS = gql`
//   query getReviews {
//     reviews {
//       _id
//       reviewText
//       reviewAuthor
//       createdAt
//     }
//   }
// `;

// export const QUERY_SINGLE_REVIEW = gql`
//   query getSingleReview($reviewId: ID!) {
//     review(reviewId: $reviewId) {
//       _id
//       reviewText
//       reviewAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         commentAuthor
//         createdAt
//       }
//     }
//   }
// `;

export const QUERY_PROTECTED = gql`
query protected {
  protected {
    id
    username
    email
    reviews {
      reviewId
      reviewText
      reviewAuthor
      movieTitle {
        title
      }
    }
    watchedMovies {
      movieId
      title
      releaseYear
      imageURL
      overview
    }
    watchlist {
      movieId
      title
      releaseYear
      imageURL
      overview
    }
  }
}
`;


