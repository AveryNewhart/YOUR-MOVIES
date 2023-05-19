import React from 'react';
import { useQuery, 
    // useMutation
 } from '@apollo/client';
import { QUERY_PROTECTED } from '../utils/queries';
// import Auth from "../utils/auth";
// import { Button } from "react-bootstrap";
import "../styles/Reviews.css";

// import { removeReviewId } from "../utils/localStorage";
// import { REMOVE_REVIEW } from '../utils/mutations';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


const UserReviews = () => {
//   const [removeReview, { error }] = useMutation(REMOVE_REVIEW);
    const { loading, data } = useQuery(QUERY_PROTECTED);
    const userData = data?.protected || {};

  
//   const handleDeleteREVIEW = async (reviewId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { data } = await removeReview({ variables: { input: { reviewId  } } });

//       // upon success, remove book's id from localStorage
//       removeReviewId(reviewId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
        <h1>MY REVIEWS</h1>
      <Row xs={2} md={5} className="g-4">
        {userData.reviews?.map((review) => (
          <Col key={review.reviewId} style={{ justifyContent: 'center', display: 'flex', marginBottom: '7rem' }}>
            <Card style={{ width: '12rem', height: '18rem', borderStyle: 'none' }}>
              {/* <Card.Img 
                variant="top" 
                src={`https://image.tmdb.org/t/p/w500${movie.imageURL}`} 
                alt={movie.title}
                onClick={() => window.location.href = `http://localhost:3000/movie/${movie.movieId}`}
                style={{ cursor: 'pointer', borderRadius: '5px' }}
              /> */}

                <Card.Body className='reviewDiv'>
                  <Card.Title style={{textAlign: 'center', fontSize: '1rem'}}>{review.reviewAuthor}</Card.Title>
                  <p>{review.reviewText}</p>
                  <p>{review.createdAt}</p>
                </Card.Body>
                  {/* <Button
                  className="btn-block btn-danger"
                  onClick={() => handleDeleteWatchedMovie(review.reviewId)}
                >
                  Delete this Review!
                </Button> */}

            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserReviews;