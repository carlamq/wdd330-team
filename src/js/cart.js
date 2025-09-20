import { getLocalStorage } from "./utils.mjs";

//Fixed Empty Cart Error Individual activity. by adding a check for empty cart, also added "(if null)|| (use empty array)[]" to avoid error if cart is empty.
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];//added "|| []" to avoid error if cart is empty
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";//put a message if cart is empty
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}
function cartItemTemplate(item) {
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

renderCartContents();
