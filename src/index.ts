type MovieID = string | number;
type Movie = {
  title: string;
  id: MovieID;
  rating?: number;
};

type ConvertMovie = (movie: Movie) => Movie

const convertMovie: ConvertMovie = (movie) => {
  return movie;
};

convertMovie({
  title: "test",
  id: 1
});