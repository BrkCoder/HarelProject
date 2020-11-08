export default function customFetch(url, payload = null) {
  url = `${process.env.REACT_APP_FETCH_URL}${url}`;
  const fPromise = payload ? fetch(url, payload) : fetch(url);

  return new Promise((resolve, reject) => {
    fPromise
      .then((res) => res.text())
      .then((data) => (data ? JSON.parse(data) : {}))
      .then((response) => resolve([response, null]))
      .catch((error) => resolve([null, error.message]));
  });
}
