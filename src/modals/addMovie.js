import { updateMovie } from "../api";
import { updateMovieApp } from "../utils";

const addMovieModal = document.querySelector("#add-movie-form-modal");
const addMovieModalCloseBtn = addMovieModal.querySelector(".btn-close-modal");
const addMovieModalForm = addMovieModal.querySelector("form");

let onAddMovieSubmit;

export const showAddMovieModal = (data = {}) => {
  addMovieModal.classList.add("visible-modal");
  addMovieModalForm.elements.title.value = data.title;
  addMovieModalForm.elements.poster_path.value = data.poster_path;
  addMovieModalForm.elements.vote_average.value = data.vote_average;
  addMovieModalForm.elements.runtime.value = data.runtime;
  addMovieModalForm.elements.overview.value = data.overview;
  addMovieModalForm.elements.release_date.value = data.release_date;
  addMovieModalForm.elements.genres.forEach((el) => {
    el.checked = data.genres.includes(el.value);
  });
  onAddMovieSubmit = (e) => {
    e.preventDefault();
    updateMovie({
      ...data,
      title: addMovieModalForm.elements.title.value,
      poster_path: addMovieModalForm.elements.poster_path.value,
      vote_average: +addMovieModalForm.elements.vote_average.value,
      runtime: +addMovieModalForm.elements.runtime.value,
      overview: addMovieModalForm.elements.overview.value,
      release_date: addMovieModalForm.elements.release_date.value,
      genres: [
        ...data.genres,
        ...Array.from(addMovieModalForm.elements.genres)
          .map((el) => (el.checked ? el.value : undefined))
          .filter((el) => el),
      ],
    }).then(() => {
      hideAddMovieModal();
      updateMovieApp();
    });
  };
  addMovieModal.addEventListener("submit", onAddMovieSubmit);
};
export const hideAddMovieModal = () => {
  addMovieModal.classList.remove("visible-modal");
  addMovieModal.removeEventListener("submit", onAddMovieSubmit);
};

addMovieModalCloseBtn.addEventListener("click", hideAddMovieModal);

document.querySelector("#dropdownBtn").addEventListener("click", () => {
  document.querySelector("#dropdownOptions").classList.toggle("hidden");
});
