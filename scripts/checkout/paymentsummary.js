import { cart, removeCart, upDateDelOp } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { changeToMon } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { delVer } from '../../data/delivery.js';
import { ordersummart } from './ordersummary.js';

export function renderOrderSummary()
{let checkoutHtml = '';
let quan = 0;

cart.forEach((cartitem) => {
  const delDate = cartitem.deliveryId;
  let delOpti;

  delVer.forEach((option) => {
    if (option.id === delDate) delOpti = option;
  });

  const today = dayjs();
  const opTon = today.add(delOpti.deliveryDays, 'days');
  const deliDate = opTon.format('dddd, MMMM D');

  const productId = cartitem.productId;
  let matchingProduct=getProduct(productId);
  quan += cartitem.quantity;

  checkoutHtml += `
    <div class="cart-item-container js-cart-item-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${deliDate}
      </div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${changeToMon(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartitem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-option" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${Delivery(matchingProduct, cartitem)}
        </div>
      </div>
    </div>
  `;
});

function Delivery(matchingProduct, cartitem) {
  let allDay = '';

  delVer.forEach((option) => {
    const isChecked = option.id === cartitem.deliveryId;
    const today = dayjs();
    const priceString = option.priceCents === 0 ? 'Free' : `$${changeToMon(option.priceCents)} -`;
    const opTon = today.add(option.deliveryDays, 'days');
    const deliDate = opTon.format('dddd, MMMM D');

    allDay += `
      <div class="delivery-option js-delivery-it" data-prod-id="${matchingProduct.id}" data-del-Ver-id="${option.id}">
        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliDate}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return allDay;
}

document.querySelector('.js-order-sum').innerHTML = checkoutHtml;
document.querySelector('.js-cart-check-it').innerHTML = `${quan} items`;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeCart(productId);
    const container = document.querySelector(`.js-cart-item-${productId}`);
    container.remove();
    ordersummart();
  });
});
document.querySelectorAll('.js-update-option').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const quantityLabel = document.querySelector(`.js-cart-item-${productId} .quantity-label`);
    let quantityOptions = '<select class="js-quantity-select" data-product-id="' + productId + '">';
    for (let i = 1; i <= 10; i++) {
      quantityOptions += `<option value="${i}">${i}</option>`;
    }
    quantityOptions += '</select>';
    quantityOptions += '<span id="confirm-span"class="link-primary js-quantity-update-button" data-product-id="' + productId + '">confirm</span>';
    quantityLabel.innerHTML = quantityOptions;

    document.querySelector(`.js-quantity-update-button[data-product-id="${productId}"]`).addEventListener('click', () => {
      const newQuantity = parseInt(document.querySelector(`.js-quantity-select[data-product-id="${productId}"]`).value, 10);
      updateQuantity(productId, newQuantity); // Assuming updateQuantity function is available
      renderOrderSummary();
      ordersummart();
    });
  });
});
function updateQuantity(prodid,quan)
{   let heid;
   cart.forEach((item)=>{
    if(prodid===item.productId)
     item.quantity=quan;
    console.log(item.productId);
   });
  }

document.querySelectorAll('.js-delivery-it').forEach((event) => {
  event.addEventListener('click', () => {
    const productId = event.dataset.prodId;
    const delVerId = event.dataset.delVerId;
    upDateDelOp(productId, delVerId);
    renderOrderSummary();
    ordersummart();
  });
});
}