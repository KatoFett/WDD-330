import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
          </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    renderListWithTemplate(productCardTemplate, this.listElement, list.filter(this.filter))
  }

  filter(product) {
    return ["880RR", "985RF", "985PR", "344YJ"].includes(product.Id);
  }
}
