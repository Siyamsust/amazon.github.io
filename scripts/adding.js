document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.button-primary').addEventListener('click', () => {
      const newProduct = {
        id: (products.length + 1).toString(),
        image: document.querySelector('.js-image').value,
        name: document.querySelector('.js-name').value,
        rating: {
          stars: parseFloat(document.querySelector('.js-ratings').value),
          count: parseInt(document.querySelector('.js-rat-Cnt').value)
        },
        priceCents: parseInt(document.querySelector('.js-pr-Cnts').value),
        keywords: document.querySelector('.js-key-wrd').value.split(',')
      };
    
      products.push(newProduct);
      console.log(products);
    });
  });