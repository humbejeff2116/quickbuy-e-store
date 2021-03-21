


















import React from 'react';
import {PageTemplate} from '../PageTemplate/pageTemplate'
import { isAuthenticated, getCartProducts,postOrders } from '../../services/ecormerce.service';
import {  Link } from 'react-router-dom';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';
import { Loader } from '../Loader/loader';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import RequireAuthentication from '../AuthHoc/authenticate';
import './checkout.css';


 class CheckoutComp extends React.Component {

    constructor(props) {

    super(props);

      this.state = {

        checkout:false,
        err:'',
        products: [],
        currency : 'USD',   
        loading:false,
        checkoutTotalSum: 0, 
        showButton: false,
       
        env : 'sandbox',
        client:{
          sandbox: 'AYmZjw11QthPP2YtpRTdojnB7r6a2YHpaD83bjttt0IdBzOhk7OKbeZCtyQQR4TK7zpEVO9TAxthNK_0',
          // clientId:'AR17KhV11CbUMNQ4zUxehpSvnsoTA1hZCDXUXTGAWtLGoDngRsARH2zTsM1z6DKCyzfoFTlgPp-SQRgd',
          // secret:'EH4QqeuR3t3LPzVBxvOp5GQe8DVg_8teiX_-F51MbLJ1pXmamsqS9bmHJcB1gA2zZ4Kn5d7YT0GiwtNE',
          production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
        },
     
      }

    }

  componentDidMount() {
  
    window.scrollTo(0,0);
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
    .then( response => response.data )
    .then(products => {
      let cart2 ={
        '2':2,
        '3':3,
        '6':2
    }
    // use cart1 later on just testing with cart2 
     let cart1 = JSON.parse(cart);
   
      for( let i = 0; i < products.data.length; i++ ) {  

            products.data[i].qty = cart2[products.data[i].id] 
    }
      
      let sum = 0;
      let checkoutTotalSum;
      const cartProd = products.data;

      for (let i = 0; i < cartProd.length; i++) {

        sum += cartProd[i].price * cartProd[i].qty;
       checkoutTotalSum = sum.toFixed(2);

      }

    return  this.setState(prevState=>({
        loading:false,
         products:products.data,
         checkoutTotalSum 
      }));

      })
      .catch(err=>{
        console.error(err);
        this.setState(prevState=>({
          loading:false,
          err:'an error occured will getting data please wait and try again'
          
        }));
      })

  }

     
   toggleCheckout = ( ) => {
     this.setState(prevState=>({
       checkout:!prevState.checkout
     }))
   }
              

  render() {
    const { products,checkoutTotalSum } =  this.state;
   
    const onSuccess = (payment) => {
      const user = localStorage.getItem('user');
      const products = this.state.products;
      const checkoutTotalSum = this.state.checkoutTotalSum;
      console.log("Your payment has been made successful!", payment);
      postOrders( payment, user, products, checkoutTotalSum )
      .then( response=> console.log('orders posted successfully') )
      .catch( err => console.error(err) );

  }	        
  const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup! 
      console.log('You have cancelled your payment', data);
  }	        
  const onError = (err) => {

      console.log("an Error! occured while carrying out transaction", err);
		 
  }		            

      if(this.state.loading){
        return(
          <PageTemplate>                     
          <ErrorBoundary>
          <Loader/>   
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
          </ErrorBoundary> 
           </PageTemplate>
        )
      }

      if(!products.length ){

        return(
          
          <PageTemplate>                     
          <ErrorBoundary>
            <div className=" checkout-container">
              <h3 className="checkOut-title">Checkout</h3><hr/>
              <h3 className="text-warning">it seems you dont have any item in your  cart</h3>
            </div>
          </ErrorBoundary> 
          </PageTemplate>
  
        )
      
      } 

        return (
          <PageTemplate>           
          <ErrorBoundary>
            <div className=" checkout-container">
              <div className="checkout">

                <div  className="checkout-title">
                  <h3>Checkout</h3>
                </div>

              {

                products.map((product, i) => 

                  <div key={i} className="checkout-product" >
                    <span className="text-primary">product name:<span className="checkout-data"> {product.name}</span> </span>
                    <span className="text-primary">price per 1: ${product.price}</span><br />
                    <span className="text-primary"> quantity: {product.qty}</span><br />
                    <span className=" text-primary">amount: ${product.qty * product.price} </span>
                  </div>

              )
              } <hr/>

                  <div className="checkout-total" >
                    <h4>
                      <small>Total Amount:</small> <span className="float-right text-primary">${checkoutTotalSum } </span>
                  </h4> <hr/>
                  </div>
                   {/*paypal button  integreating starts here  */}
                   <div>
                   {
                     (this.state.checkout) &&   (

                      <PaypalExpressBtn 
                        env={this.state.env} 
                        client={this.state.client}
                        currency={this.state.currency} 
                        total={Number(this.state.total)} 
                        onError={onError} 
                        onSuccess={onSuccess} 
                        onCancel={onCancel}
                        style = {{
                          size: 'large',
                          color: 'blue'
                        }} 
                        />
                                                
                      )
                  }
                  </div>
                  <div className="checkout-btn" >
                    <button className="btn btn-success float-right" onClick={()=>this.toggleCheckout()}>Pay</button>
                  
                    <Link to="/">
                    <button className="btn btn-danger float-right" style={{ marginRight:"10px" }}>Cancel</button>
                    </Link>
                </div>

              </div>
            </div>
          </ErrorBoundary>
          </PageTemplate> 
        );
    }

}

 const Checkout = RequireAuthentication(CheckoutComp , isAuthenticated);
 export default Checkout;

    



// on success will return this object then ill need to send the details to the backend 
// onSuccess={
//   paid: true,
//   cancelled: false, 
//   payerID: 'H8S4CU73PFRAG',
//   paymentID: 'PAY-85JK825PA3216TLESPCDA',
//   paymentToken: 'EC-8JN5188N284574L',
//   returnUrl: 'https://www.sandbox.paypal.com/?pay8JN5188N284574L&PayerID=K44CU73PFTGH'
// }




