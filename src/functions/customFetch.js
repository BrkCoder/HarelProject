export default function customFetch(url, payload = null) {
  url = `${process.env.REACT_APP_FETCH_URL}${url}`;
  const fPromise = payload ? fetch(url, payload) : fetch(url);

  return new Promise((resolve, reject) => {
    fPromise
      .then((res) => res.json()) // this trys to parse- get origin error when you have one.
      .then((response) => resolve([response.json, null]))
      .catch((error) => resolve([null, 'No response, check your network connectivity']));
  });
}
