









import React from 'react';
import shopping_cart_PNG60 from '../../images/shopping_cart_PNG65.png'

import { Link } from 'react-router-dom';

import { getCartProducts } from '../../services/ecormerce.service';

import CartItem from './cartItem';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';

import { PageLoader } from '../Loader/loader';
import {PageTemplate} from '../PageTemplate/pageTemplate'
// import {Header} from '../Header/index'
import './cart.css'
import './fullcart.css'



// create the cart component

// The removeFromCart method in this component is passed to the CartItem component.
//  It deletes the product from the cart on the localStorage and removes the product 
// from the list products to be rendered. The Cart component also provides a clearCart method which 
// removes all the items on the cart
// this is done by deleting the cart from the localStorage).

export default class AppCart extends React.Component {

  constructor(props) {

    super(props);

    this.state = { 
        products: [], 
        err:'',
        loading:false,
        total: 0 
      }

  }

  componentDidMount() {
      window.scrollTo(0,0);
    this.setState({
      loading:true
    })

    const cart = localStorage.getItem('cart');

    if (!cart){

      this.setState({

        loading:false
      });
      return; 

    }

    getCartProducts(cart)
    .then(response=>{
      // console.log(response.data)
     return response.data

    })
    .then(products => {
      let cart2 ={
        '2':2,
        '3':3,
        '6':2
    }
    // use cart1 later on just testing with cart2 
     let cart1 = JSON.parse(cart);
   
    //  console.log(cart1);
    // loop and add the quantity of each product to the response data products
    
      for( let i = 0; i < products.data.length; i++ ) {  

            products.data[i].qty = cart2[products.data[i].id] 

    }
   
      
      let sum = 0;
      let total;
      let totalQty=0;
      const cartProd = products.data;

      for (let i = 0; i < cartProd.length; i++) {

        sum += cartProd[i].price * cartProd[i].qty;   
        total = sum.toFixed(2);
        totalQty += cartProd[i].qty;
       

      }
    
      console.log("cart products are", cartProd);
      console.log("all quantity", totalQty);

      this.setState({
        loading:false,
         products:cartProd,
          total 
      });

      }).catch(err=>{
        console.error(err);
        this.setState(prevState=>({
          loading:!prevState.loading,
          err:'an error occured will getting data please wait and try again'
          
        }));
      })

  }
 
  refreshCart =( )=>{
    window.scrollTo(0,0);
    this.setState({
      loading:true
    })

    const cart = localStorage.getItem('cart');

    if (!cart){

      this.setState({

        loading:false
      });
      return; 

    }

    getCartProducts(cart)
    .then(response=>{
      // console.log(response.data)
     return response.data

    })
    .then(products => {
      let cart2 ={
        '2':2,
        '3':3,
        '6':2
    }
    // use cart1 later on just testing with cart2 
     let cart1 = JSON.parse(cart);
   
    //  console.log(cart1);
    // loop and add the quantity of each product to the response data products
    
      for( let i = 0; i < products.data.length; i++ ) {  

            products.data[i].qty = cart2[products.data[i].id] 

    }
    console.log("products are", products.data);
      
      let sum = 0;
      let total;
      const cartProd = products.data;

      for (let i = 0; i < cartProd.length; i++) {

        sum += cartProd[i].price * cartProd[i].qty;
        total = sum.toFixed(2);

      }

      this.setState({
        loading:false,
         products:products.data,
          total,
          err:'' 
      });

      }).catch(err=>{
        console.error(err);
        this.setState(prevState=>({
          loading:!prevState.loading,
          err:'an error occured will getting data please wait and refresh'
          
        }));
      })





  }

  removeFromCart = (product) => {

    let products = this.state.products.filter(item => item.id !== product.id);

    let cart = JSON.parse(localStorage.getItem('cart'));

    delete cart[product.id.toString()];

    localStorage.setItem('cart', JSON.stringify(cart));

    let sum = this.state.total - (product.qty * product.price) ;
    let total = sum.toFixed(2);

    this.setState({
      products, 
      total
    });

  }

  clearCart = () => {

    localStorage.removeItem('cart');

    this.setState({
      products: [],
      total:0
    });

  }


  render() {

    const { products, total } = this.state;
    if(this.state.loading){
      return(
        <PageTemplate>                     
        <ErrorBoundary>

           { (this.state.loading) && (<PageLoader/>) }
           <div className="cart-loader">
             <p>
               getting content please wait.......
             </p>
           
           </div>

        </ErrorBoundary> 
        </PageTemplate>

      )
    }
    if(this.state.err){
      return(
        <PageTemplate>
                    
        <ErrorBoundary>
        <div>
          <p>{this.state.err}</p>
        </div>
        <button onClick={()=>this.refreshCart()} >refresh cart</button>
        </ErrorBoundary> 
         </PageTemplate>
      )
    }

    if(!products.length){
      return(

      
         <PageTemplate>
        <ErrorBoundary> 
           
        <div className=" cart-container">
           {/* first div */}
          <div className="div1" ></div>
          {/* second div */}
          <div className="cart">
          <div className="cart-header">
          <h3 className="cart-title">Shopping Cart</h3> 
          </div>
          <div className="cart-body">
          <h2 className="cart-warning">No item in your cart</h2> 
         
          <div className="cart-img">
        <img width="200px" height="200px;" src={shopping_cart_PNG60} alt="logo" title="site logo" /> 
        </div> 
        <div className="cart-button">
      
        <button ><Link to="/">Start shoping</Link></button> 
        </div>     
         
          </div> 
          </div>  
          {/* third div   */}
          <div className="div3" >
            <div className="cart-refresh" >
          <button onClick={()=>this.refreshCart()} >Refresh cart</button>
          </div>
          </div>
        </div>   
      
          </ErrorBoundary>
          </PageTemplate>     
          
      )

    }

    return (
    
      <PageTemplate>
      <ErrorBoundary>
         

      <div className=" full-cart-container">
        <div className="full-cart">

              <div className="full-cart-header">
              <h2 className="full-cart-title">Cart</h2> 
              </div>

          <div className="full-cart-body" >           
            {

                products.map((product, index) => 

                  <CartItem product={product} removeFromCart={this.removeFromCart} key={index}/>)

            } 

            <div className="full-cart-total">

              <div className="total-header" >

                  <h4>
                  <small>Total Amount: </small>
                  <span className="float-right text-primary">${total}</span>
                  </h4>

                </div>
             
                <div className="cart-btn-ctn" >
            
                  <div  className="full-cart-button">      
                    <Link to="/checkout"> <button className="btn btn-success float-right">Checkout </button></Link>      
                  </div>

                  <div  className="full-cart-button" >
                    <button className="btn btn-danger float-right" onClick={this.clearCart} >Clear Cart</button>
                  </div>

                </div>
            </div>
          </div>
      </div>
    </div>
      </ErrorBoundary>
      </PageTemplate>     
     

    );

  }

}

