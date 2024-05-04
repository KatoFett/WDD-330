import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if ((cartItems || []).length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document
      .querySelector(".cart-card__delete")
      .addEventListener("click", removeFromCart);
  } else {
    document.querySelector(".product-list").innerHTML =
      "<li>Your cart is empty. But not for long, right?</li>";
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
  <a href="#" class="cart-card__delete" data-id="${item.Id}">✖</a>
</li>`;

  return newItem;
}

function removeFromCart() {
  const id = this.dataset.id;

  // Remove from local storage.
  const cartItems = getLocalStorage("so-cart");
  const cart = cartItems.filter((c) => c.Id == id);
  const idx = cartItems.indexOf(cart);
  cartItems.splice(idx, 1);
  setLocalStorage("so-cart", cartItems);

  // Refresh display.
  renderCartContents();
}

renderCartContents();
