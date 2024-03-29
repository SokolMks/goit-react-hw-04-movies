import { useState, useEffect } from 'react';
import fetchMovies from '../../services/movie-api';
import styles from './Review.module.css';

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovies
      .fetchMovieReviews(movieId)
      .then(({ results }) => setReviews(results));
  }, [movieId]);

  return (
    <>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p className={styles.author}>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no reviews for this movie yet...</p>
      )}
    </>
  );
};

export default Reviews;