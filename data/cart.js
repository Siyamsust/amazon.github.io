//import { delVer } from "./delivery";
export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [
    { productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryId: '1' },
    { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryId: '2' }
  ];
}

function savToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, selQuan) {
  let matchItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchItem = item;
    }
  });
  if (matchItem) {
    matchItem.quantity += selQuan;
  } else {
    cart.push({
      productId: productId,
      quantity: selQuan,
      deliveryId: '1'
    });
  }
  savToStorage();
}

export function removeCart(Id) {
  let quan = 0;
  let newCart = [];
  cart.forEach((item) => {
    if (item.productId != Id) {
      newCart.push(item);
      quan += item.quantity;
    }
  });
  cart = newCart;
  document.querySelector('.js-cart-check-it').innerHTML = `${quan} items`;
  savToStorage();
}

export function upDateDelOp(prodId, delopId) {
  let matchItem;
  cart.forEach((item) => {
    if (prodId === item.productId) {
      matchItem = item;
    }
  });
  matchItem.deliveryId = delopId;
  console.log(matchItem.deliveryId);
  savToStorage();
}
