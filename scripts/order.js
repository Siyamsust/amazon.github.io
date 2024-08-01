import { cart } from '../data/cart.js';
import { getProduct } from '../data/products.js';
import { getDelverOption } from '../data/delivery.js';
import { changeToMon } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export let order = JSON.parse(localStorage.getItem('order'));
 if(!order)
 { 
   order=[
         {orderId:"456b2ec-ce90-4b93-a653-2685f9b4701b",
          orderDate:"August 1",
          total: "52.51",
          items:[{prductId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                 productName: "Black and Gray Athletic Cotton Socks - 6 Pairs" ,
                 productImage:"images/products/athletic-cotton-socks-6-pairs.jpg",
                 productPrice: 1090,
                 quantity:2,
                 deliveryDate:"August 8"
          },
          {prductId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            productName: "Intermediate Size Basketball",
            productImage:"images/products/intermediate-composite-basketball.jpg",
            productPrice:2095,
            quantity:1,
            deliveryDate:"August 4"
     }  
    ]


        }
   ]


 }

  
 function saviToStorage() {
    localStorage.setItem('order', JSON.stringify(order));
  }
  function generateUniqueId() {
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  export function orDers() {
  
    let prodPriceCents = 0;
    let shippingPriceCents = 0;
    let cartquan = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        prodPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDelverOption(cartItem.deliveryId);
        shippingPriceCents += deliveryOption.priceCents;
        cartquan += cartItem.quantity;
    });

    const totalBeforeTax = prodPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;

    const newOrder = {
        orderId: generateUniqueId(),
        orderDate: dayjs().format('MMMM D'),
        total: changeToMon(totalCents),
        items: cart.map((cartItem) => {
            const product = getProduct(cartItem.productId);
            const deliveryOption = getDelverOption(cartItem.deliveryId);
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('MMMM D');

            return {
                productId: cartItem.productId,
                productName: product.name,
                productImage: product.image,
                productPrice: changeToMon(product.priceCents),
                quantity: cartItem.quantity,
                deliveryDate: deliveryDate,
            };
        }),
    };

    // Push the new order to the order array
    order.push(newOrder);
    saviToStorage();
    localStorage.removeItem('cart');
    console.log(cart);

}
export function futs(){  
    let orderHtml = '';  
  
        order.forEach((orders) => {
             // Debugging: Check the structure of `orders.items`
            orderHtml += `
                    <div class="order-header">
                        <div class="order-header-left-section">
                            <div class="order-date">
                                <div class="order-header-label">Order Placed:</div>
                                <div>${orders.orderDate}</div>
                            </div>
                            <div class="order-total">
                                <div class="order-header-label">Total:</div>
                                <div>$${orders.total}</div>
                            </div>
                        </div>
                        <div class="order-header-right-section">
                            <div class="order-header-label">Order ID:</div>
                            <div>${orders.orderId}</div>
                        </div>
                    </div>
                    <div class="order-details-grid">
            `;

            orders.items.forEach((item) => {
                orderHtml += `
                    <div class="product-image-container">
                        <img src="${item.productImage}">
                    </div>
                    <div class="product-details">
                        <div class="product-name">${item.productName}</div>
                        <div class="product-delivery-date">Arriving on: ${item.deliveryDate}</div>
                        <div class="product-quantity">Quantity: ${item.quantity}</div>
                        <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>
                    <div class="product-actions">
                        <a href="tracking.html">
                            <button class="track-package-button button-secondary">Track package</button>
                        </a>
                    </div>
                `;
            });

            orderHtml += '</div>';
            let quin=0;
            cart.forEach(item=>{
             quin+=item.quantity;
            });
          
          
     
            
        });
        return orderHtml;
    


}
export function cartquan()
{
    let quin=0;
    cart.forEach(item=>{
     quin+=item.quantity;
    });
   return quin;

}

