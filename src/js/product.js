import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData();
const productID = getParam("product");

function addProductToCart(item) {
  let cart = getLocalStorage("so-cart") || [];
  // Check if item already exists in cart
  const existingItem = cart.find((cartItem) => cartItem.Id === item.Id);

  if (existingItem) {
    // If item exists, increment quantity
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // If item doesn't exist, add it with quantity 1
    item.quantity = 1;
    cart.push(item);
  }

  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const SelectProduct = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(SelectProduct);
}

// add listener to Add to Cart button
// COMMENTED OUT: This conflicts with ProductDetails.mjs event listener
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);

const product = new ProductDetails(productID, dataSource);
product.init();

// Load header and footer
loadHeaderFooter();
