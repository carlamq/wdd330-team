import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

// Cart functionality is now handled in ProductDetails.mjs

// Event listener is now handled in ProductDetails.mjs

const product = new ProductDetails(productID, dataSource);
product.init();

// Load header and footer
loadHeaderFooter();