


















   import React from 'react';

   import { isAuthenticated, getCartProducts,postOrders } from '../../services/ecormerce.service';

   import {  Redirect, Link } from 'react-router-dom';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';
import { PageLoader } from '../Loader/loader';
// import PaypalButton from '../Paypal/paypalButton';
import PaypalExpressBtn from 'react-paypal-express-checkout';


  //   This component will only be rendered if the user authenticated (logged in).
  // This component loads and renders all the products on the cart, much like the Cart component.
  // It also provides a pay button which will in this case alert a message to proceed 
  // to payment after accessing a secured route on the backend server

export default class Checkout extends React.Component {

    constructor(props) {

    super(props);

      this.state = {

        checkout:false,
        products: [],
        currency : 'NGN',   
        loading:false,
        total: 0, 
        showButton: false,
        // env : process.env.NODE_ENV === 'production'? 'production': 'sandbox',
        env : 'sandbox',
        client:{
          sandbox: 'AXmLq1EemtB6AA1kfmc4yCKBtpnwly8EF_FFGnEofI0FvUUJMSkBompe1KXfn5QwWulteR_gSPRjiiRZ',
          production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
        },
     
      }

    }

  componentDidMount() {
    window.scrollTo(0,0)
    this.setState({
      loading:true
    });
    const cart = localStorage.getItem('cart');

      if (!cart){
        return this.setState({
          loading:false
        }); 
      } 

      getCartProducts(cart)
      .then(response=> response.data)
      .then( products => {

        let sum = 0;
        let total;
  
        for (let i = 0; i < products.length; i++) {
  
          sum += products[i].price * products[i].qty;
          total = sum.toFixed(2);
  
        }
  
        this.setState({
          loading:false,
           products,
            total 
        });

      });

    }
    componentDidUpdate(prevProps, prevState) {
      window.scrollTo(0,0)
    }
    

   toggleCheckout=()=>{
     this.setState(prevState=>({
       checkout:!prevState.checkout
     }))
   }
              

  render() {
    const { products, total } =  this.state;
   
    const onSuccess = (payment) => {
      const user = localStorage.getItem('user');
      const products = this.state.products;
      const total = this.state.total;
      console.log("Your payment has been made successful!", payment);
      postOrders(payment,user,products,total)
      .then(response=>console.log('orders posted successfully'))
      .catch(err=> console.error(err));

  }	        
  const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup! 
      console.log('You have cancelled your payment', data);
  }	        
  const onError = (err) => {

      console.log("an Error! occured while carrying out transaction", err);
// Since the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js" 
// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			 
  }		            



   //  if you are not authenticated you are redirected to the login page
      if (!isAuthenticated()){

          return (

          <Redirect to="/login" />
          
          );

      }

      if(!products.length){

        return(
                      
          <ErrorBoundary>
             { (this.state.loading) && (<PageLoader/>) }

        <div className=" checkout-container">
            <h3 className="checkOut-title">Checkout</h3><hr/>

          <h3 className="text-warning">No item in the cart</h3>
          </div>
          </ErrorBoundary> 
         

        )
      
      } 

        return (
         
            
          <ErrorBoundary>
              { (this.state.loading) && <PageLoader/> }
          

            <div className=" checkout-container">

              <h3 className="checkOut-title">Checkout</h3><hr/>

              {

                products.map((product, i) => 

                  <div key={i} >
                    <p>{product.name} <small> (quantity: {product.qty})</small>
                      <span className="float-right text-primary">amount: ${product.qty * product.price} </span>
                    </p> <hr/>
                  </div>

              )
              } <hr/>

                  <>
                    <h4>
                      <small>Total Amount:</small> <span className="float-right text-primary">${total} </span>
                  </h4> <hr/>
                  </>
                   {/*paypal button  integreating starts here  */}
                   {
                     (this.state.checkout) &&   <PaypalExpressBtn 
                                                env={this.state.env} 
                                                client={this.state.client}
                                                currency={this.state.currency} 
                                                total={this.state.total} 
                                                onError={onError} 
                                                onSuccess={onSuccess} 
                                                onCancel={onCancel}
                                                style={{
                                                  size: 'large',
                                                  color: 'blue'
                                                }} 
                                                />
                  }
                  <button className="btn btn-success float-right" onClick={()=>this.toggleCheckout()}>Pay</button>
              
              <Link to="/">
                <button className="btn btn-danger float-right" style={{ marginRight:"10px" }}>Cancel</button>
              </Link> <br/><br/><br/>

            </div>
            </ErrorBoundary> 
          

        );
    }

}

    



// on success will return this object then ill need to send the details to the backend 
// onSuccess={
//   paid: true,
//   cancelled: false, 
//   payerID: 'H8S4CU73PFRAG',
//   paymentID: 'PAY-85JK825PA3216TLESPCDA',
//   paymentToken: 'EC-8JN5188N284574L',
//   returnUrl: 'https://www.sandbox.paypal.com/?pay8JN5188N284574L&PayerID=K44CU73PFTGH'
// }




