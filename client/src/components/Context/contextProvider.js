











import React, {useState} from 'react';
import MyContext from './context';




export default function ContextProvider(props) {
    const [cartProducts, setCartProducts] = useState([])
    const [numberOfItems, setNumberOfItems] =  useState(0);
    const [quantity, setQuantity] = useState(1);
    const [loading] = useState(false);
    const  [cartTotalSum, setTotalSum] = useState(0);
    const [size, setSize] = useState('');
    const  [redirect] = useState('');
    const [err, setErr] = useState(false);
    const [errMssg, setErrMssg] = useState('');
    const [cartMssg, setCartMssg] = useState('');
    const [mssg, setMssg] = useState(false);

    const addToCart = (id, src, name, price) => {
        let productQnty = quantity;
        const cartProducts = cartProducts;
        let cartId =0;
    
        if( id < 1 ){
            throw new Error('id should not be less than one');
        }
        if(productQnty < 1) {
            errMssg ='quantity should not be less than 1';
            setErr(true);
            setErrMssg(errMssg)
            return;   
        } 
        if(!size) {
            errMssg ='please select a particular size';
            setErr(true);
            setErrMssg(errMssg)
            return;   
        }
        if(size) {
            setErr(false);
            setErrMssg('')
        }
        if(isNaN(productQnty)) {
            errMssg ='please key in a quantity of your choice';
            setErr(true);
            setErrMssg(errMssg)
            return;
        }
    
        for (let i = 0; i < cartProducts.length; i++) {
            if(cartProducts[i].id === id) {
            cartId += id;
            }
        }
        
        if(cartId) { 
            const products = cartProducts.map(product => {
                if(product.id === cartId) {
                    product.qty = quantity;
                }
                return product;
            })
            setCartProducts(products);
            setMssg(true);
            setErr(false);
            setCartMssg('item added to cart sucessfully');
            localStorage.removeItem('cartProducts');
            localStorage.setItem('cartProducts',JSON.stringify(products));
            return; 
        }
        setCartProducts( [ ...cartProducts, {id, src, name, price, qty: productQnty}] );
        setMssg(true);
        setErr(false);
        setCartMssg('item added to cart sucessfully'); 
        localStorage.removeItem('cartProducts');
        localStorage.setItem('cartProducts',JSON.stringify(products)); 
    }
   
   

    const addQuantity = (id) => {
        const products = cartProducts;
        let cartSum = 0;
        let cartTotalQty = 0;
        let cartTotalSum;
        for(let i = 0; i < products.length; i++) {
            if(products[i].id === id) {
                products[i].qty += 1;   
            }
            cartSum += products[i].price * products[i].qty;   
            cartTotalSum = cartSum.toFixed(2);
            cartTotalQty += products[i].qty;
        }
        localStorage.removeItem('cartProducts');
        localStorage.setItem('cartProducts',JSON.stringify(products))
        setCartProducts(products); 
        setTotalSum(cartTotalSum);   
    }

   
    const reduceQuantity = (id) => {
        const products = cartProducts;
        let cartSum = 0;
        let cartTotalQty = 0;
        let cartTotalSum;
        for(let i = 0; i < products.length; i++) {
            if(products[i].id === id) {
                if(products[i].qty < 2) {
                    return;
                }
                products[i].qty -= 1;    
            }
            cartSum += products[i].price * products[i].qty;   
            cartTotalSum = cartSum.toFixed(2);
            cartTotalQty += products[i].qty;
        }
        localStorage.removeItem('cartProducts');
        localStorage.setItem('cartProducts',JSON.stringify(products));
        setCartProducts(cartProducts);
        setTotalSum(cartTotalSum);
    }
    const removeFromCart = (product) => {
        const products = cartProducts;
        products.filter(product =>  product.id !== product.id );
        let cartSum = cartTotalSum - (product.qty * product.price); 
        let totalSum = cartSum.toFixed(2);
        localStorage.removeItem('cartProducts');
        localStorage.setItem('cartProducts', JSON.stringify(products));
        setCartProducts(products);
        setTotalSum(totalSum);
    }
    const   clearCart = ( ) => {
        localStorage.removeItem('cartProducts');
        setCartProducts([]);
        setTotalSum(0);
    }

    const handleInputChange = e => {
        if(e.target.value && (!isNaN(e.target.value)) ) { 
           return setQuantity(parseInt(e.target.value));
        }
        if(isNaN(e.target.value)) {
            setErr(true);
            setQuantity(1);
            return setErrMssg('quantity is expected to be a number')       
        }
        return setQuantity(parseInt(e.target.value))       
    }
    
    return(
        <MyContext.Provider 
            value={{
                cartproducts: cartProducts,
                addToCart: addToCart,
                removeFromCart: removeFromCart,
                addQuantity: addQuantity,
                reduceQuantity: reduceQuantity, 
                setQuantity: setQuantity,
                handleInputChange: handleInputChange,
                clearCart: clearCart,
                quantity: quantity,
                total: cartTotalSum,
                err: err,
                errMssg: errMssg,
                cartMssg: cartMssg,
                mssg: mssg,
            }}
        >
            {props.children}
        </MyContext.Provider>
    )  
}






















// export default class ContextProvider extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             cartProducts: [],
//             numberOfCartItems: 0,
//             quantity: 1,
//             err: '',
//             loading: false,
//             cartTotalSum: 0,
//             redirect: '', 
//         }
//     }
//     addQuantity = (id) => {
//         const products = this.state.cartProducts;
//         let cartSum = 0;
//         let cartTotalQty = 0;
//         let cartTotalSum;
//         for(let i = 0; i < products.length; i++) {
//             if(products[i].id === id) {
//                 products[i].qty += 1;   
//             }
//             cartSum += products[i].price * products[i].qty;   
//             cartTotalSum = cartSum.toFixed(2);
//             cartTotalQty += products[i].qty;
//         }
//         localStorage.removeItem('cartProducts');
//         localStorage.setItem('cartProducts',JSON.stringify(products))
//         return this.setState({
//             products, 
//             cartTotalSum,
//         })    
//     }

//     addToCart = (id, src, name, price) => {
//         buying_quantity = cart[id] + parseInt(quantity, 10);
//         const cartProducts = this.state.cartProducts;
//         let cartId =0;
    
//         if( id < 1 ){
//             throw new Error('id should not be less than one');
//         } 
      
//         for (let i = 0; i < cartProducts.length; i++) {
//             if(cartProducts[i].id === id){
//               cartId += id;
//             }
//         }
       
//         if( cartId ) {
//             return cartProducts.map(product => {
//             if(product.id === cartId) {
//                 product.qty = this.state.quantity;
//             }
//             return prod;
//             })
//         }
       
//         return [
//           ...cartProducts,
//           {id, src, name, price, qty}
//         ]   

//     }
//     reduceQuantity = (id) => {
//         const products = this.state.cartProducts;
//         let cartSum = 0;
//         let cartTotalQty = 0;
//         let cartTotalSum;
//         for(let i = 0; i < products.length; i++) {
//           if(products[i].id === id) {
//             if(products[i].qty < 2) {
//               return;
//             }
//             products[i].qty -= 1;    
//           }
//           cartSum += products[i].price * products[i].qty;   
//           cartTotalSum = cartSum.toFixed(2);
//           cartTotalQty += products[i].qty;
//         }
//         // const cartProducts= JSON.parse(localStorage.getItem('cartProducts'));
//         localStorage.removeItem('cartProducts');
//         localStorage.setItem('cartProducts',JSON.stringify(products))
//         return this.setState({
//           cartProducts, 
//           cartTotalSum,
//         })

//     }
//     removeFromCart = (product) => {
//         let cartProducts = this.state.cartProducts;
//         cartProducts.filter(product =>  product.id !== product.id );
//         let cartSum = this.state.cartTotalSum - (product.qty * product.price); 
//         let cartTotalSum = cartSum.toFixed(2);
//         localStorage.removeItem('cartProducts');
//         localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
//         return this.setState({
//             cartProducts, 
//             cartTotalSum
//         });
//     }

//      handleInputChange = e => {
//         if(e.target.value && (!isNaN(e.target.value)) ) { 
//            return setQuantity(parseInt(e.target.value));
//         }
//         if(isNaN(e.target.value)) {
//             setErr(true);
//             setQuantity(1);
//             return setErrMssg('quantity is expected to be a number')       
//         }
//         return setQuantity(parseInt(e.target.value))       
//     }
//     setQuantity =()=>{
//         this.setState(prevState =>({

//         }))

//     }
//     render() {
//         return(
//             <MyContext.Provider value={{
//                 state: this.state,
//                 addToCart: this.addToCart,
//                 removeFromCart: this.removeFromCart,
//                 addQuantity: this.addQuantity,
//                 reduceQuantity: this.reduceQuantity,        
//             }}
//             >
//                 {this.props.children}
//             </MyContext.Provider>
//         )
//     }
// }