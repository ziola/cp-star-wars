const BASE_URL = "https://swapi.dev/api/";

export type Movie = {
  id: string;
  title: string;
  releaseDate: string;
  openingCrawl: string;
  director: string;
  producer: string;
  characters: Array<string>;
};

export async function getMovies(query?: string) {
  const url = BASE_URL + "films/" + (query ? "?search=" + query : "");
  const movies = await fetch(url);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (await movies.json()).results.map((rawMovie: any): Movie => {
    return {
      id: rawMovie.episode_id,
      title: rawMovie.title,
      releaseDate: rawMovie.release_date,
      openingCrawl: rawMovie.opening_crawl,
      director: rawMovie.director,
      producer: rawMovie.producer,
      characters: rawMovie.characters,
    };
  });
}
