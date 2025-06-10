import { getObjSearchParamsFromCurrentUrl, updateMovieApp } from "../utils";

const sortElement = document.querySelector("[data-sort]");

sortElement.addEventListener("change", function (e) {
  const [sortBy = "", sortOrder = ""] = e.target.value.split("-");

  updateMovieApp({ sortBy, sortOrder });
});

export const updateActiveSort = () => {
  const { sortBy = "", sortOrder = "" } = getObjSearchParamsFromCurrentUrl();
  const sortValue = `${sortBy}-${sortOrder}`;
  sortElement.value = sortValue;
};
