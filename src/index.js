import "./styles/main.scss";
import { getMoviesList } from "./api";
import { renderCards } from "./mainContent";
import { getObjParamsFromUrl, MOVIE_EVENT_NAME } from "./utils";
import { renderTotal, updateActiveFilters, updateActiveSort } from "./filters/";
import { updateSearchField } from "./search";

const initApp = () => {
  updateSearchField();
  updateActiveFilters();
  updateActiveSort();
  const params = getObjParamsFromUrl(window.location.search);
  getMoviesList(params).then((data) => {
    renderCards(data.data);
    renderTotal(data.totalAmount);
  });
};

document.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("popstate", initApp);
window.addEventListener(MOVIE_EVENT_NAME, initApp);
