
import { cart } from '../../data/cart.js';
import { getProduct} from '../../data/products.js';
import {  getDelverOption} from '../../data/delivery.js';
import { changeToMon} from '../utils/money.js' 
//import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {  orDers} from '../order.js';
import { renderOrderSummary } from './paymentsummary.js';

export function ordersummart()
{  let orderHtml='';   
    let prodPriceCents=0;
    let shippingPriceCents=0;
    let cartquan=0;  
  cart.forEach((cartItem) => {
          const product=getProduct(cartItem.productId);
          prodPriceCents+=product.priceCents*cartItem.quantity;
          const deliveryOption= getDelverOption(cartItem.deliveryId);
          shippingPriceCents +=deliveryOption.priceCents;
          cartquan+=cartItem.quantity;
    });
    console.log(cart);
    const totalBeforeTax=prodPriceCents + shippingPriceCents;
    const taxCents=totalBeforeTax*0.1;
    const totalCents=totalBeforeTax+taxCents;

    orderHtml+=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-paym-it">Items (${cartquan}):</div>
            <div class="payment-summary-money">$${changeToMon(prodPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${changeToMon(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${changeToMon(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${changeToMon(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${changeToMon(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-order-place">
            Place your order
          </button>`

document.querySelector('.js-payment-sum').innerHTML=orderHtml;



  // Attach event listener to place order button
  document.querySelector('.js-order-place').addEventListener('click', () => {
    if(document.querySelector('.js-order-place').innerHTML ==='Order Placed')
    {
      alert('please enter items to  cart');
    }
    else
    {orDers();
    renderOrderSummary();
    ordersummart();
    document.querySelector('.js-order-place').innerHTML='Order Placed';
    }
    
  });


}
        