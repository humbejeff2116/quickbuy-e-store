











import C from './constants'




export const addToCart = (id, name, price, src, buying_quantity) => {
    return {

        type:C.ADD_TO_CART,
        id,
        name,
        price,
        src,
        qty:buying_quantity

    }
}
export const removeFromCart =(id)=>{
    return {
        type:C.REMOVE_FROM_CART,
        id
    }

}
export const updateCart =(id,buying_quantity)=>{
    return {
        type:C.UPDATE_CART,
        id,
       qty:buying_quantity
    }

}
export const sortCart =(sortBy)=>{
    return {
        type:C.SORT_CART,
        sortBy
    }

}