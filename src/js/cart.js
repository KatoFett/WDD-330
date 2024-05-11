import { loadHeaderFooter } from "./utils.mjs";
import { renderCartContents, getCart } from "./ShoppingCart.mjs";

loadHeaderFooter();

renderCartContents();

const cart = getCart();
if (cart.length > 0) {
  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.FinalPrice,
    0,
  );
  document.querySelector(".cart-footer").classList.remove("hide");
  document.querySelector(".cart-total").innerText = `Total: $${total}`;
}
