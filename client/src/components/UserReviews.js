import React
// , {useState} 
from 'react';
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
// import { Movie } from '../../../server/models';


const UserReviews = () => {
//   const [removeReview, { error }] = useMutation(REMOVE_REVIEW);
    const { loading, data } = useQuery(QUERY_PROTECTED);
    const userData = data?.protected || {};
    // const [movie, setMovie] = useState(null); // set initial state to null

  
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
      <Row>
        {userData.reviews?.map((review) => (
          <Col className='colSmall' key={review.reviewId} style={{ marginBottom: '7rem' }}>
            <Card className='reviewDiv'>
                <Card.Body className='reviewDivPage'>
                  <Card.Title style={{ fontSize: '1rem'}} className="authorText">{review.reviewAuthor}</Card.Title>
                  {review.movieTitle && <p className="authorText">{review.movieTitle.title}</p>}
                  <p>{review.reviewText}</p>
                  {/* <p>{review.createdAt}</p> */}
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