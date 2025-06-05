import { updateSearchParams } from "./url";

export const MOVIE_EVENT_NAME = "movies";

export const getMovieEvent = () =>
  document.dispatchEvent(new Event(MOVIE_EVENT_NAME, { bubbles: true }));

export const updateMovieApp = (params) => {
  updateSearchParams(params);
  getMovieEvent();
};
