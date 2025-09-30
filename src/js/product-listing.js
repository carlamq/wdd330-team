import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// load shared header and footer
loadHeaderFooter();

// get category from URL (?category=tents)
const category = getParam("category") || "tents"; // default to tents if missing

// create a ProductData instance (no category needed here)
const dataSource = new ProductData();

// get the element to render products into
const listElement = document.querySelector(".product-list");

// create ProductList with category, datasource, and element
const productList = new ProductList(category, dataSource, listElement);

// render the products
productList.init();
