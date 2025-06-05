import { getObjSearchParamsFromCurrentUrl, updateMovieApp } from "../utils";

const searchForm = document.querySelector("#search-form");

export const updateSearchField = () => {
  const { search } = getObjSearchParamsFromCurrentUrl();
  if (search) searchForm.elements.search.value = search;
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = searchForm.elements.search.value;
  updateMovieApp({ search: searchValue, searchBy: "title" });
});
