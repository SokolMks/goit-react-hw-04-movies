import { useState, useEffect } from 'react';
import fetchMovies from '../../services/movie-api';
import styles from './Cast.module.css';

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovies.fetchMovieCast(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  return (
    <>
      {cast.length > 0 ? (
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {cast.map(({ id, name, profile_path, character }) => (
              <li key={id} className={styles.list_item}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                      : 'not found image'
                  }
                  alt=""
                />
                <p className={styles.name}>{name}</p>
                {character && <p className={styles.character}>{character}</p>}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>not found any cast info</p>
      )}
    </>
  );
};

export default Cast;