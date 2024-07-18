import { useCallback, } from 'react';
import './Movies.css'
import { Movie } from '../../services/MovieService';



export function Movies({ movies, showCharacters }: { movies: Array<Movie>, showCharacters: (movei: Movie) => void }) {
  const onCharacterClick = useCallback((movie: Movie) => () => {
    showCharacters(movie);
  }, [showCharacters]);

  return (
    <ul className="movies">
      {movies.map(movie => (<li key={movie.id} className="movie">
        < h2 > {movie.title}</h2>
        Release on: {movie.releaseDate}
        <br />Directed by: {movie.director}
        <br />Produced by: {movie.producer}
        <p>{movie.openingCrawl}</p>
        <div>
          <button type="button" onClick={onCharacterClick(movie)}>Characters</button>
        </div>
      </li >))
      }
    </ul >
  )
}

