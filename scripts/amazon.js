import { cart ,addToCart} from "../data/cart.js";
import { products } from "../data/products.js";
import { changeToMon } from "./utils/money.js";
let prod = '';
updatequan();
products.forEach((product) => {
  prod += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${changeToMon(product.priceCents)}
          </div>

          <div class="product-quantity-container js-quantity">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>

`;



});

function updatequan()
{
  let cartQuantity=0; 
  cart.forEach((cartitem)=>{
    console.log(cartitem);
    cartQuantity+=cartitem.quantity;
  });
  document.querySelector('.js-cart-qun').innerHTML=cartQuantity;

}
document.querySelector('.js-product').innerHTML = prod;
document.querySelectorAll('.js-add-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const prodContainer=button.closest('.product-container');
    const quantitySelect=prodContainer.querySelector('.js-quantity select');
    const selQuan=parseInt(quantitySelect.value,10);
   
    addToCart(productId,selQuan);
    updatequan();
   
  });
});







