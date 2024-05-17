import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const form = document.querySelector("main form");
const checkout = new CheckoutProcess(form);
checkout.displaySummary();
