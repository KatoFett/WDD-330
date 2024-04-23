import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const CART_KEY = "so-cart";

function addProductToCart(product) {
  const currentCart = getLocalStorage(CART_KEY) || [];
  currentCart.push(product);
  setLocalStorage(CART_KEY, currentCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
