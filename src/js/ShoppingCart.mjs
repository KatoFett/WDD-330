import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

const CART_KEY = "so-cart";

export function renderCartContents() {
  const cartItems = getLocalStorage(CART_KEY);
  if ((cartItems || []).length > 0) {
    renderListWithTemplate(cartItemTemplate, document.querySelector(".product-list"), cartItems);
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
      src="${item.product.Images.PrimaryMedium}"
      alt="${item.product.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.product.Name}</h2>
  </a>
  <p class="cart-card__color">${item.product.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.product.FinalPrice}</p>
  <a href="#" class="cart-card__delete" data-id="${item.product.Id}">✖</a>
</li>`;

  return newItem;
}

export function addProductToCart(product){
  const currentCart = getCart();
  let cartItem = getItemFromCart(product.id, currentCart);
  if(cartItem === undefined){
    cartItem = {
      id: product.id,
      quantity: 1,
      product: product
    };
    currentCart.push(cartItem);
  }
  else {
    cartItem.quantity++;
  }
  setLocalStorage(CART_KEY, currentCart);
}

function getItemFromCart(id, cart){
  const cartItems = cart || getCart();
  const matches = cartItems.filter((c) => c.Id == id);
  return matches.length == 1 ? matches[0] : undefined;
}

function getCart(){
  return getLocalStorage(CART_KEY) || [];
}

function removeFromCart() {
  const id = this.dataset.id;

  // Remove from local storage.
  const cartItems = getCart();
  const cart = getItemFromCart(id, cartItems);
  const idx = cartItems.indexOf(cart);
  cartItems.splice(idx, 1);
  setLocalStorage(CART_KEY, cartItems);

  // Refresh display.
  renderCartContents();
}
