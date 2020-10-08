import refs from "./refs.js";
import apiService from "./apiService.js";
import template from "../template/template.hbs";
import debounce from "lodash.debounce";
console.log(refs);
console.log(apiService.fetchImage());
const item = apiService.fetchImage().then((hits) => template(hits));
console.log(item);

refs.form.addEventListener(
  "input",
  debounce((event) => {
    event.preventDefault();
    console.log(event.target.value);
    apiService.query = event.target.value;
    renderApi();
    refs.input.value = "";
  }, 300),


);

function renderApi() {
  apiService.fetchImage().then(({ hits }) => {
    console.log(hits);
    return renderImages(hits);
  });
}
const loadMoreButton = document.createElement("button")
loadMoreButton.textContent = "Load more...";
loadMoreButton.classList.add("LoadMore-button");

function renderImages(data) {
  const items = template(data);
  refs.galleryList.insertAdjacentHTML("beforeend", items);
    if (refs.galleryList !=="") {
      refs.body.insertAdjacentElement("beforeend", loadMoreButton)
        loadMoreButton.classList.remove("hidden");
    } else {
      loadMoreButton.classList.add("hidden");
    }
}
