const addMovieModal = document.querySelector("#add-movie-form-modal");
const addMovieModalCloseBtn = addMovieModal.querySelector(".btn-close-modal");
const addMovieModalForm = addMovieModal.querySelector("form");

export const showAddMovieModal = (data) => {
  addMovieModal.classList.add("visible-modal");
  addMovieModalForm.elements.title.value = data.title;
};
export const hideAddMovieModal = () => {
  addMovieModal.classList.remove("visible-modal");
};

addMovieModalCloseBtn.addEventListener("click", hideAddMovieModal);
