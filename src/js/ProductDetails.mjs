import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { addProductToCart } from "./ShoppingCart.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
  }
  addToCart() {
    addProductToCart(this.product);
  }
  renderProductDetails(selector) {
    const container = document.querySelector(selector);

    // section
    const section = document.createElement("section");
    section.classList.add("product-detail");
    
    // brand
    let elm = document.createElement("h3");
    elm.textContent = this.product.Brand.Name;
    section.appendChild(elm);

    // name
    elm = document.createElement("h2");
    elm.classList.add("divider");
    elm.textContent = this.product.NameWithoutBrand;
    section.appendChild(elm);

    // img
    elm = document.createElement("img");
    elm.classList.add("divider");
    elm.src = this.product.Images.PrimaryLarge;
    elm.alt = this.product.NameWithoutBrand;
    section.appendChild(elm);

    // price
    elm = document.createElement("p");
    elm.classList.add("product-card__price");
    elm.textContent = `$${this.product.FinalPrice}`;
    section.appendChild(elm);

    // color
    elm = document.createElement("p");
    elm.classList.add("product-card__color");
    elm.textContent = this.product.Colors[0].ColorName;
    section.appendChild(elm);

    // description
    elm = document.createElement("p");
    elm.classList.add("product-card__description");
    elm.innerHTML = this.product.DescriptionHtmlSimple;
    section.appendChild(elm);

    // add to cart
    elm = document.createElement("div");
    elm.classList.add("product-detail__add");
    const btn = document.createElement("button");
    btn.id = "addToCart";
    btn.dataset.id = this.product.Id;
    btn.textContent = "Add to Cart";
    btn.addEventListener('click', this.addToCart.bind(this))
    elm.appendChild(btn);
    section.appendChild(elm);
    
    // append section to container
    container.appendChild(section);
  }
}
