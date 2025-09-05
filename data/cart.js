export const cart =[];
    export function addToCart(valueselectBox,machingItem,buttenId){
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
    }