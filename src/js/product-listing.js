import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");

// Update page title with category
const titleElement = document.querySelector(".title");
if (titleElement && category) {
  // Capitalize first letter and replace hyphens with spaces
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ");
  titleElement.textContent = formattedCategory;
}

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();