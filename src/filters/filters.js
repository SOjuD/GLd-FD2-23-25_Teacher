import { getObjSearchParamsFromCurrentUrl, updateMovieApp } from "../utils";

const filtersContainer = document.querySelector(".movie-toolbar__filters");

export const updateActiveFilters = () => {
  const { filter } = getObjSearchParamsFromCurrentUrl();

  filtersContainer.querySelectorAll("[data-filter]").forEach((item) => {
    if (item.dataset.filter === filter) item.classList.add("active");
    else item.classList.remove("active");
  });
  if (!filter) {
    filtersContainer
      .querySelector("[data-filter='all']")
      .classList.add("active");
  }
};

filtersContainer.addEventListener("click", (e) => {
  const filter = e.target.closest("[data-filter]")?.dataset.filter;

  if (!filter) return;

  updateMovieApp({ filter: filter === "all" ? "" : filter });
});
