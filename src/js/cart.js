//Week3 Strech Activity - Refactor the Shopping Cart
//The shopping cart code has been moved to ShoppingCart.mjs
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Initialize shopping cart with localStorage key and parent selector
const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();

// Load header and footer
loadHeaderFooter();
