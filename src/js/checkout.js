import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

// Initialize checkout process
const checkout = new CheckoutProcess("so-cart", ".order-summary");

document.addEventListener("DOMContentLoaded", () => {
  // Initialize checkout and show subtotal
  checkout.init();
  
  // Calculate order totals
  checkout.calculateOrderTotal();
  
  //event listener to zip code field to recalculate totals
  const zipField = document.getElementById("zip");
  if (zipField) {
    zipField.addEventListener("blur", () => {
      checkout.calculateOrderTotal();
    });
  }
  
  //form submission
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const myForm = document.forms[0];
      const chk_status = myForm.checkValidity();
      myForm.reportValidity();
      
      if(chk_status) {
        await checkout.checkout();
      }
    });
  }
});