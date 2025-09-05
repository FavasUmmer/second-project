import { cart } from '../data/cart.js';
import { products } from '../data/products.js';
let productsHTML='';
products.forEach((product)=>{
productsHTML +=` <div class="product-container">
          <div class="product-image-container">
            <img alt="image cant seen" class=" product-image"src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img alt="image cant seen" class="product-rating-stars"
              src="images/ratings/rating-${Math.round((product.rating.stars * 10)/5)*5}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents / 100}
          </div>

          <div class="product-quantity-container">
            <select class="quantitySelect">
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

          <div class="added-to-cart ">
            <img alt="image cant seen" src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
})
 
document.querySelector('.js-products-grid').innerHTML=productsHTML;
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
button.addEventListener('click',() => {
    let machingItem;
    const productContainer = button.closest('.product-container');
    const selectBox = productContainer.querySelector('.quantitySelect');
    const buttenId=button.dataset.productId;
    cart.forEach((item)=>{
       if(buttenId===item.productId){
        machingItem=item;
       }
    });
    let valueselectBox=parseInt(selectBox.value)
 

    if(valueselectBox>1){
      if(machingItem){
        machingItem.quantity +=valueselectBox;
      }else{
        cart.push({
          productId:buttenId,
          quantity:valueselectBox
        });
      }
    }else{    
        if(machingItem){
          machingItem.quantity +=1;
        }else{
          cart.push({
            productId:buttenId,
            quantity:1
          });
        }
    }
    let added =  button.previousElementSibling;
    added.style.opacity = 5;
    setTimeout(() => {
       added.style.opacity = 0;
      }, 1000);
    let cartQuantity=0;
 
    cart.forEach((item)=>{
      cartQuantity +=item.quantity;
    });
    console.log(cartQuantity);
    console.log(cart)
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity; 
  });

});
  
