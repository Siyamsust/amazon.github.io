const cart={ 
         cartitems:undefined,
         loadFromStorage()
     {this.cartitems= JSON.parse(localStorage.getItem('cart-oop'));
    if (!this.cartitems) {
      this.cartitems = [
        { productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryId: '1' },
        { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryId: '2' }
      ];
    }
},
 savToStorage() {
    localStorage.setItem('cart-oop', JSON.stringify(this.cartitems));
  },
  addToCart(productId, selQuan) {
    let matchItem;
    this.cartitems.forEach((item) => {
      if (productId === item.productId) {
        matchItem = item;
      }
    });
    if (matchItem) {
      matchItem.quantity += selQuan;
    } else {
      this.cartitems.push({
        productId: productId,
        quantity: selQuan,
        deliveryId: '1'
      });
    }
    this.savToStorage();
  },
  removeCart(Id) {
    let quan = 0;
    let newCart = [];
    this.cartitems.forEach((item) => {
      if (item.productId != Id) {
        newCart.push(item);
        quan += item.quantity;
      }
    });
    this.cartitems = newCart;
    document.querySelector('.js-cart-check-it').innerHTML = `${quan} items`;
    this.savToStorage();
  },
  upDateDelOp(prodId, delopId) {
    let matchItem;
    this.cartitems.forEach((item) => {
      if (prodId === item.productId) {
        matchItem = item;
      }
    });
    matchItem.deliveryId = delopId;
    //console.log(matchItem.deliveryId);
    this.savToStorage();
  } 



};
cart.loadFromStorage();
console.log(cart);

 