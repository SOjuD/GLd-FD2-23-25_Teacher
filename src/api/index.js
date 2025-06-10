const API_BASE_URL = "http://localhost:4000/movies";

export const getMoviesList = async (params, id, method = "GET") => {
  const url = new URL(API_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  url.searchParams.append("limit", 20);
  return await fetch(url, {
    method,
  }).then((data) => {
    if (data.ok === true) return data.json();
  });
};

export const getMovieDetails = async (id) => {
  return await fetch(`${API_BASE_URL}/${id}`).then((data) => {
    if (data.ok === true) return data.json();
  });
};
