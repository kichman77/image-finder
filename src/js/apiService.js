import refs from "./refs";

const API_key = "18623552-aad7218af3511e8a6a5692c49";

const baseUrl = "https://pixabay.com/api/";
// let query = "js";
// let page = 1;
// let perPage = 12;

export default {
  _query: " ",
  page: 1,
  perPage: 12,

  fetchImage() {
    let url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${API_key}`;
    return fetch(url)
      .then((res) => res.json())
      .catch((erro) => displayError(error));
  },
  setPage() {
    return this.page++;
  },
  get query() {
    return this._query;
  },
  set query(newQuery) {
    return this._query = newQuery;
  },
};

function displayError(error) {
  const errorH2 = document.createElement("h2");
  errorH2.textContent = error;
  refs.body.prepend(errorH2);
}
