import { showAddMovieModal } from "../modals";
import { getMovieDetails } from "../api";

const DEFAULT_MOVIE_POSTER =
  "https://marketplace.canva.com/EAFTl0ixW_k/1/0/1131w/canva-black-white-minimal-alone-movie-poster-YZ-0GJ13Nc8.jpg";

const moviesContainer = document.querySelector("#search-results-movies");

const createMovieCard = (movie) => {
  const cardTemaplate = document
    .querySelector("#movie-template")
    .content.cloneNode(true);

  cardTemaplate.querySelector(".movie-card__title").textContent = movie.title;
  cardTemaplate.querySelector(".movie-card__year").textContent =
    movie.release_date.split("-")[0];
  cardTemaplate.querySelector(".movie-card__genre").textContent =
    movie.genres.join(", ");
  cardTemaplate.querySelector(".movie-card__menu-edit").dataset.edit = movie.id;
  cardTemaplate.querySelector(".movie-card__menu-delete").dataset.delete =
    movie.id;
  const img = cardTemaplate.querySelector("img");
  img.src = movie.poster_path;
  img.alt = movie.title;

  img.addEventListener("error", () => {
    img.src = DEFAULT_MOVIE_POSTER;
  });

  return cardTemaplate;
};

const handleCardsClick = (e) => {
  const isContextMenuButtonClicked = e.target.closest(".btn-movie-menu");
  const deleteId = e.target.closest("[data-delete]")?.dataset.delete;
  const editId = e.target.closest("[data-edit]")?.dataset.edit;
  const isCloseContextMenuButtonClicked = e.target.closest(".btn-close-modal");
  const cardElement = e.target.closest(".movie-card");
  const menuElement = cardElement.querySelector(".movie-card__menu");

  const documentClickHandler = (e) => {
    const isMenuClick = !!e.target.closest(".movie-card__menu");

    if (!isMenuClick) menuElement.classList.remove("visible");
  };

  const addDocumentClickListener = () => {
    setTimeout(
      () =>
        document.addEventListener("click", documentClickHandler, {
          once: true,
        }),
      0,
    );
  };

  if (editId) {
    getMovieDetails(editId).then((data) => {
      showAddMovieModal(data);
    });
    addDocumentClickListener();
  }

  if (isContextMenuButtonClicked) {
    menuElement.classList.add("visible");
    addDocumentClickListener();
  } else if (isCloseContextMenuButtonClicked) {
    menuElement.classList.remove("visible");
  }
};

moviesContainer.addEventListener("click", handleCardsClick);

export const renderCards = (movieList) => {
  moviesContainer.innerHTML = "";
  moviesContainer.append(...movieList.map(createMovieCard));
};
