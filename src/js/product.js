import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

function addProductToCart(item) {
  let cart = getLocalStorage("so-cart") || [];

  cart.push(item);

  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const SelectProduct = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(SelectProduct);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

const product = new ProductDetails(productID, dataSource);
product.init();
