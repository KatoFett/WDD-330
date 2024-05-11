const HEADER_URL = "/partials/header.html";
const FOOTER_URL = "/partials/footer.html";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if(clear === true) {
    parentElement.innerHTML = "";
  }
  const html = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, html.join(''));
}

export function renderWithTemplate(template, parentElement, data, position = "afterbegin", clear = false) {
  if(clear === true) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, template);
}

export async function loadTemplate(url) {
  const response = await fetch(url);
  const html = await response.text();
  return html;
}

export async function loadHeaderFooter(headerElement = undefined, footerElement = undefined) {
  if(headerElement == undefined)
    headerElement = document.getElementById("header");
  if(footerElement == undefined)
    footerElement = document.getElementById("footer");

  const header = await loadTemplate(HEADER_URL);
  const footer = await loadTemplate(FOOTER_URL);
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}

export function toTitleCase(str) {
  return str.replace('-',' ').replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
