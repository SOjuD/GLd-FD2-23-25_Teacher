const totalContainer = document.querySelector(".movie-gallery__amount");

export const renderTotal = (total) => {
  totalContainer.innerText = total;
};
