import { loadHeaderFooter} from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

// Initialize checkout process
const checkout = new CheckoutProcess("so-cart", ".order-summary");

document.addEventListener('DOMContentLoaded', () => {
  // Load header and footer
  
  
  // Initialize checkout and show subtotal
  checkout.init();
  
  // Calculate order totals
  checkout.calculateOrderTotal();
  
  //event listener to zip code field to recalculate totals
  const zipField = document.getElementById('zip');
  if (zipField) {
    zipField.addEventListener('blur', () => {
      checkout.calculateOrderTotal();
    });
  }
  
  //form submission
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate all fields are filled
      const formData = new FormData(form);
      let allFieldsFilled = true;
      
      for (let [key, value] of formData.entries()) {
        if (!value.trim()) {
          allFieldsFilled = false;
          break;
        }
      }
      
      if (!allFieldsFilled) {
        alert('Please fill in all required fields.');
        return;
      }
      
      await checkout.checkout();
    });
  }
});