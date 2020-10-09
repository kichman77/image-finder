import refs from "./refs";

const API_key = "18623552-aad7218af3511e8a6a5692c49";

const baseUrl = "https://pixabay.com/api/";
// let query = "js";
// let page = 1;
// let perPage = 12;

export default {
  _query: "",
  page: 1,
  perPage: 12,

  async fetchImage() {
    let url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this._query}&page=${this.page}&per_page=${this.perPage}&key=${API_key}`;

    try {
      const res = await fetch(url);
      const getResponse = await res.json();
      return getResponse
    } catch (error) {
      throw error
    }
  },
  setPage() {
    return this.page++;
  },
  resetPage() {
    return (this.page = 1);
  },
  get query() {
    return this._query;
  },
  set query(newQuery) {
    return (this._query = newQuery);
  },
};


