
import React, { useEffect, useState } from 'react';
import MyContext from './context';
import  setErrorMessage from './setErrorMessage';
import { postOrders } from '../../services/ecormerce.service';




export default function ContextProvider(props) {
    const [cartProducts, setCartProducts] = useState([])
    const [cartQuantity, setCartQuantity] =  useState(0);
    const  [cartTotalSum, setTotalSum] = useState(0);

    
    useEffect(()=>{
        setStateOnload(); 

    },[])

    const setStateOnload = ( )=> {
        let cartProd = localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts')): [];
        let cartSum = 0;
        let cartTotalQty = 0;
        let cartTotalSum;

        for (let i = 0; i < cartProd.length; i++) {
            cartSum += cartProd[i].price * cartProd[i].qty;   
            cartTotalSum = cartSum.toFixed(2);
            cartTotalQty += cartProd[i].qty;
        }
        setCartProducts(cartProd);
        setTotalSum(cartTotalSum);
        setCartQuantity(cartTotalQty)
    }
   
    const addToCart = (id, src, name, price, setErr, setErrMssg, setMssg, setCartMssg, quantity, size) => {
        let productQnty = quantity;
        let errorMessage;  
        let cartId ='';
        let cartSum = 0;
        let cartTotalQty = 0;
        let cartTotalSum;
    
        if (productQnty < 1) {
            errorMessage ='quantity should not be less than 1';
            return setErrorMessage(true, errorMessage, setErr, setErrMssg)           
        } 
        if (!size) {
            errorMessage ='please select a particular size';
            return setErrorMessage(true, errorMessage, setErr, setErrMssg)               
        }
        if (size) {
            errorMessage ='';
            setErrorMessage(false, errorMessage, setErr, setErrMssg)          
        }
        if (isNaN(productQnty)) {
            errorMessage ='please key in a quantity of your choice';
            return setErrorMessage(true, errorMessage, setErr, setErrMssg);            
        }   
        for (let i = 0; i < cartProducts.length; i++) {
            if(cartProducts[i].id === id) {
            cartId += id;
            }
        }  
        if (cartId) {
            // TODO... add product to cart instead of updating it if different size is chosen by user
            const products = cartProducts.map(product => {
                if (product.id === cartId) {
                    product.qty += quantity;
                    product.size = size;
                }
                return product;
            })
            for (let i = 0; i < products.length; i++) {
                cartSum += products[i].price * products[i].qty;   
                cartTotalSum = cartSum.toFixed(2);
                cartTotalQty += products[i].qty;
            }
            setCartProducts(products);
            setTotalSum(cartTotalSum);
            setCartQuantity(cartTotalQty)
            setMssg(true);
            setErr(false);
            setCartMssg('item added to bag sucessfully');
            localStorage.removeItem('cartProducts');
            localStorage.setItem('cartProducts',JSON.stringify(products));
            return; 
        }
        const newCartproduct = [ ...cartProducts, {id, src, name, price, qty: productQnty, size}];
        setCartProducts(  newCartproduct );
        for (let i = 0; i < newCartproduct.length; i++) {
            cartSum +=  newCartproduct[i].price * newCartproduct[i].qty;   
            cartTotalSum = cartSum.toFixed(2);
            cartTotalQty +=  newCartproduct[i].qty;
        }
        setTotalSum(cartTotalSum);
        setCartQuantity(cartTotalQty);
        setMssg(true);
        setErr(false);
        setCartMssg('item added to bag sucessfully'); 
        localStorage.removeItem('cartProducts');
        localStorage.setItem('cartProducts', JSON.stringify(newCartproduct)); 
    }
   
    const addQuantity = (id) => {
        const products = cartProducts;
        let cartSum = 0;
        let cartTotalQty = 0;
        let cartTotalSum;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products[i].qty += 1;   
            }
            cartSum += products[i].price * products[i].qty;   
            cartTotalSum = cartSum.toFixed(2);
            cartTotalQty += products[i].qty;
        }
        localStorage.removeItem('cartProducts');
        localStorage.setItem('cartProducts', JSON.stringify(products))
        setCartProducts(products); 
        setTotalSum(cartTotalSum);
        setCartQuantity(cartTotalQty);   
    }

    const reduceQuantity = (id) => {
        const products = cartProducts;
        let cartSum = 0;
        let cartTotalQty = 0;
        let cartTotalSum;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                if (products[i].qty < 2) {
                    return;
                }
                products[i].qty -= 1;    
            }
            cartSum += products[i].price * products[i].qty;   
            cartTotalSum = cartSum.toFixed(2);
            cartTotalQty += products[i].qty;
        }
        localStorage.removeItem('cartProducts');
        localStorage.setItem('cartProducts', JSON.stringify(products));
        setCartProducts(cartProducts);
        setTotalSum(cartTotalSum);
        setCartQuantity(cartTotalQty);
    }

    const removeFromCart = (cartProduct) => {
        let cartSum = 0;
        let cartTotalQty = 0;
        let cartTotalSum;
        const products = cartProducts.filter(product =>  product.id !== cartProduct.id);
        for (let i = 0; i <products.length; i++) {
            cartSum +=  products[i].price * products[i].qty;   
            cartTotalSum = cartSum.toFixed(2);
            cartTotalQty +=  products[i].qty;
        }
        localStorage.removeItem('cartProducts');
        localStorage.setItem('cartProducts', JSON.stringify(products));
        setCartProducts(products);
        setTotalSum(cartTotalSum);
        setCartQuantity(cartTotalQty);
    }

    const clearCart = () => {
        localStorage.removeItem('cartProducts');
        setCartProducts([]);
        setTotalSum(0);
        setCartQuantity(0);
    }


    const onSuccess = (payment) => {
        const user = localStorage.getItem('user');
        const products = cartProducts;
        const checkoutTotalSum = cartTotalSum;
        console.log("Your payment has been made successful!", payment);
        postOrders(payment, user, products, checkoutTotalSum )
        .then(response => console.log('orders posted successfully') )
        .catch(err => console.error(err));
    }

    return(
        <MyContext.Provider 
            value={{
                cartProducts: cartProducts,
                addToCart: addToCart,
                removeFromCart: removeFromCart,
                addQuantity: addQuantity,
                reduceQuantity: reduceQuantity, 
                clearCart: clearCart,
                onSuccess: onSuccess,
                cartTotalSum: cartTotalSum,
                cartQuantity: cartQuantity  
            }}
        >
            {props.children}
        </MyContext.Provider>
    )  
}