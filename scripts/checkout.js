import { cart ,removeFromCart} from '../data/cart.js';
import { products } from '../data/products.js';
import  formatCurrency from './utils/money.js';
import { deliveryOption } from '../data/deliveryOption.js';
import {hello}from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today =dayjs();
const dliveryDate = today.add(7, 'days');
console.log(dliveryDate.format('dddd, MMMM D'));

hello();
let cartSummaryHTML='';
 let machingProduct;
cart.forEach((cartItem)=>{
    const productId=cartItem.productId;
    products.forEach((product)=>{    
        if(productId===product.id){
            machingProduct=product;  
        }
    });
   cartSummaryHTML+= `<div class="cart-item-container js-cart-item-container-${machingProduct.id} ">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
               alt="image cant seen"
                src="${machingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${machingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(machingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${machingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(machingProduct,cartItem)}
              </div>
            </div>
          </div>`;
});


function deliveryOptionHTML(machingProduct,cartItem){
  let html=``;
  deliveryOption.forEach((deliveryOption)=>{
    const today =dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd,MMMM D');
    const priceString = deliveryOption.priceInCents === 0 
    ? 'Free'
    : `$${formatCurrency(deliveryOption.priceInCents)} -`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html +=`
                <div class="delivery-option">
                  <input type="radio"
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${machingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>`
  });
  return html;
}
          document.querySelector('.js-order-summary').innerHTML= cartSummaryHTML;
          document.querySelectorAll('.js-delete-link').forEach((link)=>{
            link.addEventListener('click',()=>{
              const productId=link.dataset.productId;
              removeFromCart(productId);
             const container = document.querySelector(`.js-cart-item-container-${productId}`);
            
             container.remove();
            });
          });