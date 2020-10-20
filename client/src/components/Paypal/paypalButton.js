










import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

// import PaypalButton from 'react-paypal-express-checkout';
import PropTypes from 'prop-types';
 
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    window.React = React;
    window.ReactDOM = ReactDOM;
    this.state = {
      showButton: false,
      // env : process.env.NODE_ENV === 'production'? 'production': 'sandbox',
      env : 'sandbox',
      client:{
        sandbox: 'AXmLq1EemtB6AA1kfmc4yCKBtpnwly8EF_FFGnEofI0FvUUJMSkBompe1KXfn5QwWulteR_gSPRjiiRZ',
        production: process.env.PAYPAL_CLIENT_ID_PRODUCTION,
      },
      commit: true, // Show a 'Pay Now' button
    };
  }
  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (!this.state.show) {
      if (isScriptLoaded && !this.props.isScriptLoaded) {
        if (isScriptLoadSucceed) {
          this.setState({ showButton: true });
        } else {
          console.log('Cannot load Paypal script!');
          this.props.onError();
        }
      }
    }
  }
 
  render() {
    const {total,currency, onSuccess,onError,onCancel,} = this.props;

     // Set up the transaction
    const createOrder = (data, actions)=> {
      return actions.order.create({
          purchase_units: [{
              amount: {
                  value: total,
                  currency_code: "NGN",
              }
          }]
      });
  }
 
       // Finalize the transaction
      const onApprove= (data, actions)=> {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
    }
 
    return(
    <div>
        {
        this.state.showButton && ( <PaypalExpressBtn
                                    env={this.state.env}
                                    client={this.state.client}
                                   createOrder={createOrder}
                                    commit={this.state.commit}
                                    onApprove={onApprove}
                                    onCancel={onCancel}
                                    onError={onError}
                                 /> )

        }

    </div>
    )
  }
}
 
PaypalButton.propTypes = {
  currency: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  client: PropTypes.object.isRequired,
};
 
PaypalButton.defaultProps = {
  env: 'sandbox',
  currency:'NGN',
  total:1,
  client: {
    sandbox:    'xxxxxxxxx', // sandbox client ID
  },
  onSuccess:f => f,
  onCancel: f => f,
  onError: f => f
};
 
// const paypalApi = 'https://www.paypalobjects.com/api/checkout.js';
export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);