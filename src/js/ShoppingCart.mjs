//Week3 Strech Activity - Refactor the Shopping Cart
import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    // cartItemTemplate of cart.js
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
  return newItem;
}

// class ShoppingCart
export default class ShoppingCart {
    constructor(key, parentSelector) { // key = "so-cart" (localStorage)
        this.key = key;
        this.parentSelector = parentSelector; // selector of the element where the cart items will be rendered
    }

    async init() {
        const cartItems = this.getCartContents();
        this.renderCartContents(cartItems);
    }
    
    getCartContents() {
        return getLocalStorage(this.key) || []; // Return cart items or empty array if cart is empty
    }
    
    renderCartContents(list) {
        const parentElement = document.querySelector(this.parentSelector);
        
        if (list.length === 0) {
            parentElement.innerHTML = "<p>Your cart is empty</p>";
        } else {
            renderListWithTemplate(cartItemTemplate, parentElement, list, "afterbegin", true);
        }
    }
}