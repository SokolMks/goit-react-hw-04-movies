import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Navigation = lazy(() =>
  import('./components/Navigation/Navigation'),
);
const HomePage = lazy(() =>
  import('./components/HomePage/Homepage'),
);
const MoviesPage = lazy(() =>
  import('./components/MoviePage/Moviepage'),
);
const MovieDetailsPage = lazy(() =>
  import('./components/MovieDetails/Moviedetails'),
);

export default function App() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Navigation />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/movies" component={MoviesPage} exact />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
      </Switch>
    </Suspense>
  );
}