














import C from './constants'




export const cartReducer =( state=[], action )=> {

    let cartId =0;
    switch(action.type){
        case C.ADD_TO_CART:

            if( action.id < 1 ){
        
                throw new Error('id should not be less than one');
        
              }          
            // loop through cart a to get cart id
            for(let i = 0; i < state.length; i++){

                if(state[i].id === action.id){

                  cartId += action.id;

                }

              }
            console.log("cart id is : ",cartId);
            //   if cart  id found update product in cart instead of adding product
            if( cartId ) {

             return state.map(prod => {

                if( prod.id === cartId ){

                    return {
                        
                        ...prod ,
                        qty:action.qty
                    } 

                }

                return prod;

              });

            }
            // if no id found add product to cart 
            return [

              ...state,
              {
                 id: action.id,
                 name: action.name,
                 price:action.price,
                 src:action.src,
                  qty:action.qty
                }

            ]
        case C.REMOVE_FROM_CART:
            return state.filter(prod => {

                return prod.id !== action.id

            })
        case C.UPDATE_CART:
            return state.map( prod => {

                return  (prod.id !== action.id) ? prod :
                {
                    ...prod,
                    rating:action.qty
                }

            })
    
            default:
                return state

    }

} 
export const sortReducer = (state='SORT_BY_NAME', action) => {

    switch(action.type){
        case C.SORT_CART:
            return action.sortBy
        default:
            return state  
    }
}



// add to cart functionality

function addCart(crt,id,price,name,qty) {
    const cart =[...crt];
    let cartId =0;

    if( id < 1 ){

        throw new Error('id should not be less than one');

      }
  
   
    // loop through cart a to get cart id
    for(let i = 0; i <cart.length; i++){
        if(cart[i].id === id){
          cartId += id;
        }
      }
    console.log(cartId);
    // update product in cart  if id found
    if( cartId ) {
     return cart.map(prod=>{
        if(prod.id === cartId){
          prod.qty = qty;
        }
        return prod;
      })
    }
    // if no id found add product to cart 
    return [
      ...cart,
      {id,price,name,qty}
    ]
  
    
  }
  addCart(cart,2,2904,"jet li", 20);