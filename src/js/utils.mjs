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
// return parameter from URL when requested
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// team activity week 3
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  // Load the header and footer templates in from the partials using the loadTemplate
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");
  // Grab the header and footer placeholder elements out of the DOM.
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");
  // Render the header and footer using renderWithTemplate.
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}
export function alertMessage(message, scroll = true) {
  //create the alert
  const alert = document.createElement('div');
  alert.classList.add('alert');
  
  //alert content
  alert.innerHTML = `
    <p>${message}</p>
    <span class="alert-close">×</span>
  `;
  
  alert.addEventListener('click', function(e) {
    if (e.target.classList.contains('alert-close')) {
      const main = document.querySelector('main');
      main.removeChild(this);
    }
  });
  
  //top to main
  const main = document.querySelector('main');
  main.prepend(alert);
  
  //scroll top if necesariy
  if (scroll) {
    window.scrollTo(0, 0);
  }
}