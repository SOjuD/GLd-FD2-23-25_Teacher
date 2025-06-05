export const getObjParamsFromUrl = (search) => {
  const params = new URLSearchParams(search);

  return params.entries().reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

export const getSearchStringFromObject = (params) => {
  const url = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    url.append(key, value);
  });

  return url.toString();
};

export const getObjSearchParamsFromCurrentUrl = () =>
  getObjParamsFromUrl(window.location.search);

export const updateSearchParams = (newParams = {}) => {
  const url = new URL(window.location.origin);
  Object.entries({
    ...getObjSearchParamsFromCurrentUrl(window.location.search),
    ...newParams,
  }).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  window.history.pushState(null, null, url);
};
