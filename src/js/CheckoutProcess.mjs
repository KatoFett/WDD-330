import { getCart } from "./ShoppingCart.mjs";

const TAX_PERCENT = 0.06;

export default function showSummary() {
  // Calculate values
  const cart = getCart();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.FinalPrice,
    0,
  );
  const tax = round(subtotal * TAX_PERCENT);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = 10 + round(2 * (itemCount - 1));
  const total = subtotal + tax + shipping;
  
  // Display values
  document.querySelector('.checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector('.checkout-shipping').textContent = `$${shipping.toFixed(2)}`;
  document.querySelector('.checkout-tax').textContent = `$${tax.toFixed(2)}`;
  document.querySelector('.checkout-total').textContent = `$${total.toFixed(2)}`;
}

function round(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}
