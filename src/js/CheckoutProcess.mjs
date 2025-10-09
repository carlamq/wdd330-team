import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary(); // Este será tu método para mostrar subtotal
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");
    const itemNumElement = document.querySelector(this.outputSelector + " #num-items");
    
    if (itemNumElement) itemNumElement.innerText = this.list.length;
    
    const amounts = this.list.map((item) => {
      const quantity = item.quantity || 1;
      return item.FinalPrice * quantity;
    });
    
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    
    if (summaryElement) summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    
    this.displayOrderTotals();
  }

  // Tu método displayOrderTotals ya está perfecto
  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (tax) tax.innerText = `$${this.tax.toFixed(2)}`;
    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (orderTotal) orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);
        const finalOrder = {
            orderDate: new Date().toISOString(),
            fname: order.firstName,
            lname: order.lastName,
            street: order.street,
            city: order.city,
            state: order.state,
            zip: order.zip,
            cardNumber: order.cardNumber,
            expiration: order.expiration,
            code: order.code,
            items: packageItems(this.list),
            orderTotal: this.orderTotal.toFixed(2),
            shipping: this.shipping.toFixed(2),
            tax: this.tax.toFixed(2)
        };
        
        try {
            const response = await services.checkout(finalOrder);
            console.log("Order submitted successfully:", response);
        } catch (err) {
            console.error("Order submission failed:", err);
        }

    }
}