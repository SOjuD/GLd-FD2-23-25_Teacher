import { showAddMovieModal } from "../modals";

const addMovieBtn = document.querySelector("#add-movie-btn");

addMovieBtn.addEventListener("click", () => {
  showAddMovieModal();
});
