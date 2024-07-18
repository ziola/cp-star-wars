import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import './App.css'
import { DetailsModal } from './components/Modal/Modal';
import { Movies } from './components/Movies/Movies';
import { getMovies, Movie } from './services/MovieService';
import { Character, getCharacter } from './services/CharacterService';

function App() {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [loadingCharacters, setLoadingCharacters] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(false);

  const loadData = async (query: string) => {
    setLoadingMovies(true);
    try {
      const movies = await getMovies(query);
      setMovies(movies);
    } catch {
      console.log("Handle error");
    } finally {
      setLoadingMovies(false);
    }
  }

  useEffect(() => {
    loadData("");
  }, []);

  const updateQuery = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.currentTarget.value);
  }, []);

  const handleSearch = useCallback((ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    loadData(query);
  }, [query]);

  const showCharacters = useCallback(async (movie: Movie) => {
    setLoadingCharacters(true);
    setSelectedMovie(movie);
    try {
      const promises = movie.characters.map(getCharacter);
      const characters = await Promise.all(promises);
      setCharacters(characters);
    } catch {
      console.log("Handle error");
    } finally {
      setLoadingCharacters(false);
    }
  }, []);

  const hideCharacters = useCallback(() => {
    setSelectedMovie(null);
    setCharacters([]);
  }, []);

  return (
    <>
      <h1>CP Star wars movies</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" id="search" placeholder="Search for movie title" value={query} onChange={updateQuery} />
        <button type="submit" >Search</button>
      </form>
      {loadingMovies ? "Loading..." :
        <Movies movies={movies} showCharacters={showCharacters} />
      }
      <DetailsModal
        loading={loadingCharacters}
        openModal={!!selectedMovie}
        closeModal={hideCharacters}
        title={selectedMovie?.title}
        data={characters}
        renderFn={(character) => (<li key={character.url}>
          Name: {character.name}
          <br />Height: {character.height}
          <br />Mass: {character.mass}
          <br />Hair color: {character.hairColor}
          <br />Skin color: {character.skinColor}
          <br />Eye color: {character.eyeColor}
          <br />Birth year: {character.birthYear}
        </li>)}>
      </DetailsModal>
    </>
  )
}

export default App
