import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  NavLink,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import fetchMovies from '../../services/movie-api';
import styles from './Moviedetails.module.css';

const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: 'Cast' */));
const Reviews = lazy(() =>
  import('../Review/Reviews' /* webpackChunkName: 'Reviews' */),
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchMovies.fetchMoviesById(movieId).then(response => setMovie(response));
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" className={styles.goBack_btn} onClick={onGoBack}>
            Go back
          </button>
          <div className={styles.movie_details}>
            <div className={styles.movie_img}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : 'not found image'
                }
                alt={movie.title}
              />
            </div>
            <div className={styles.movie_text}>
              <p className={styles.movie_title}>{movie.title}</p>
              <p className={styles.movie_description}>{movie.overview}</p>
            </div>
          </div>

          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { ...location.state },
            }}
            className={styles.nav_item}
            activeClassName={styles.activeNavLink}
          >
            Cast
          </NavLink>

          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { ...location.state },
            }}
            className={styles.nav_item}
            activeClassName={styles.activeNavLink}
          >
            Reviews
          </NavLink>

          <Suspense fallback={<h2>Loading...</h2>}>
            <Route path={`${url}/cast`}>
              <Cast movieId={movieId} />
            </Route>

            <Route path={`${url}/reviews`}>
              <Reviews movieId={movieId} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;