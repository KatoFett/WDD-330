import { getCart, clearCart } from "./ShoppingCart.mjs";
import ExternalServices from "./ExternalServices.mjs";

const TAX_PERCENT = 0.06;

export default class CheckoutProcess {
  constructor(form) {
    this.cart = getCart();
    this.subtotal = this.cart.reduce(
      (sum, item) => sum + item.quantity * item.product.FinalPrice,
      0,
    );
    this.tax = round(this.subtotal * TAX_PERCENT);
    const itemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.shipping = 10 + round(2 * (itemCount - 1));
    this.total = this.subtotal + this.tax + this.shipping;

    form.addEventListener("submit", (event) => this.submitForm(event));
  }

  displaySummary() {
    document.querySelector('.checkout-subtotal').textContent = `$${this.subtotal.toFixed(2)}`;
    document.querySelector('.checkout-shipping').textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector('.checkout-tax').textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector('.checkout-total').textContent = `$${this.total.toFixed(2)}`;
  }

  async submitForm(event) {
    // Intercept submit
    event.preventDefault();

    const form = event.target;
    form.reportValidity();
    if (!form.checkValidity())
      return;

    // Clear validation messages
    document.querySelectorAll(".validation-msg").forEach(e => e.remove());
    document.querySelectorAll(".input-invalid").forEach(e => e.classList.remove("input-invalid"));

    // Prepare data
    const json = formToJSON(form);
    json.orderDate = new Date().toISOString();
    json.items = packageItems(this.cart);
    json.orderTotal = this.total.toFixed(2);
    json.shipping = this.shipping.toFixed(2);
    json.tax = this.tax.toFixed(2);

    // Submit data
    external = new ExternalServices();
    try {
      const response = await external.checkout(json);
      if (response.orderId > 0) {
        clearCart();
        window.location.assign("/checkout/success.html");
      }
      else {
        const invalid = Object.keys(response);
        for (name of invalid) {
          const input = document.querySelector(`form [name="${name}"]`);
          input.classList.add("input-invalid");
          const p = document.createElement("p");
          p.classList.add("validation-msg");
          p.textContent = response[name];
          input.after(p);
        }
      }
    }
    catch (error) {
      alert("An error occurred while checking out.");
    }
  }
}

function round(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

function packageItems(items) {
  return items.map(item => ({
    id: item.id,
    name: item.product.Name,
    price: item.product.FinalPrice,
    quantity: item.quantity
  }));
}

function formToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
