import refs from "./refs.js";
import apiService from "./apiService.js";
import template from "../template/template.hbs";

import debounce from "lodash.debounce";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

const loadMoreButton = document.createElement("button");
loadMoreButton.textContent = "load more...";
loadMoreButton.classList.add("loadMore-button");

loadMoreButton.addEventListener("click", loadMore);

refs.galleryList.addEventListener("click", (event) => {
  if (event.target.nodeName === "IMG") {

    const instance = basicLightbox.create(`
       <img class="lightBoxImage" src="${event.target.dataset.src}" width="800" height="600">
    `);
    console.log(event.target.src);
    instance.show();
  }
});

refs.form.addEventListener(
  "input",
  debounce((event) => {
    event.preventDefault();
    refs.galleryList.innerHTML = "";
    apiService.resetPage();
    apiService.query = event.target.value;
    renderApi();
    refs.input.value = "";
  }, 800)
);

function renderApi() {
  apiService.fetchImage().then(({ hits }) => renderImages(hits));
}

function renderImages(data) {
  const items = template(data);
  refs.galleryList.insertAdjacentHTML("beforeend", items);
  if (refs.galleryList !== "") {
    refs.body.insertAdjacentElement("beforeend", loadMoreButton);
    loadMoreButton.classList.remove("hidden");
  }
  if (!refs.galleryList.children.length) {
    loadMoreButton.classList.add("hidden");
  }
}

function loadMore() {
  apiService.setPage();
  apiService.fetchImage().then(({ hits }) => {
    renderImages(hits);

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.offsetHeight - 2500,
        behavior: "smooth"
      });
    },500);
  });
}
