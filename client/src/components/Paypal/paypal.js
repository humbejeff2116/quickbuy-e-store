








// <script src="https://www.paypalobjects.com/api/checkout.js"></script>

// <div id="paypal-button"></div>

{/* <script> */}
  paypal.Button.render({
    env: 'sandbox', // Or 'production'
    // Set up the payment:
    // 1. Add a payment callback
    payment: function(data, actions) {
      // 2. Make a request to your server
      return actions.request.post('/my-api/create-payment/')
        .then(function(res) {
          // 3. Return res.id from the response
          return res.id;
        });
    },
    // Execute the payment:
    // 1. Add an onAuthorize callback
    onAuthorize: function(data, actions) {
      // 2. Make a request to your server
      return actions.request.post('/my-api/execute-payment/', {
        paymentID: data.paymentID,
        payerID:   data.payerID
      })
        .then(function(res) {
          // 3. Show the buyer a confirmation message.
        });
    }
  }, '#paypal-button');
  
// </script>




import React from 'react';
import '../App.css';
import PaypalButton from 'react-paypal-express-checkout';
import {paypalCheckout} from "../actions";

class PayPal extends React.Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);   
       }   
        onSuccess(payment) {
        const data = {
            cartDetail: this.props.cartDetail,
            paymentData: payment
        };        paypalCheckout(data) /* updates on the backend */
            .then(res => {
                if (res.success) {
                    console.log(res)
                }
            })
    }  
      render() {
        const success = payment => {
            console.log("Payment succeeded!", payment);
            this.onSuccess(payment);
        };        const error = err => {
            console.log("Something went wrong...", err)
        };        
        let env = 'sandbox'; /* change to 'production' for production purposes */        const client = {
            sandbox: 'PUT_YOUR_SANDBOX_CLIENT_ID_HERE',
            production: 'PUT_YOUR_LIVE_CLIENT_ID_HERE'
        };        return (
            <PaypalButton
                env={env}
                client={client}
                currency='CAD'
                total={this.props.total}
                onError={error}
                onSuccess={success}
                style={{
                    size: 'large',
                    color: 'blue'
                }}
            />
        )    
      }
}
export default PayPal;