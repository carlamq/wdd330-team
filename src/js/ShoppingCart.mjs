//Week3 Strech Activity - Refactor the Shopping Cart
import { renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    // cartItemTemplate of cart.js
    const quantity = item.quantity || 1;
    const totalPrice = (item.FinalPrice * quantity).toFixed(2);
    
    let imageUrl = "";
    if (item.Images && item.Images.PrimaryMedium) {
        imageUrl = item.Images.PrimaryMedium;
    } else if (item.Image) {
        imageUrl = item.Image;
    } else {
        imageUrl = "/images/placeholder.jpg"; // fallback
    }
    
    const newItem = `<li class="cart-card divider">
    <button class="remove-btn" data-id="${item.Id}">X</button>
    <a href="#" class="cart-card__image">
      <img
        src="${imageUrl}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${totalPrice}</p>
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
        const removeBtn = parentElement.querySelectorAll(".remove-btn");
        removeBtn.forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = e.target.dataset.id;
                this.deleteItemInCart(productId);
            });
            
        });
    }

    deleteItemInCart(productId) {
        //Delete button activity - Remove from cart feature
        let cart = this.getCartContents() //1 get the cart contents
        
        //2 Find the item to remove
        const itemIndex = cart.findIndex(item => item.Id === productId);
        
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                // If quantity > 1, just decrease quantity
                cart[itemIndex].quantity -= 1;
            } else {
                // If quantity = 1, remove the item completely
                cart.splice(itemIndex, 1);
            }
        }
        
        //3 save the new storage
        setLocalStorage(this.key, cart);
        //render
        this.renderCartContents(cart);
    }
}