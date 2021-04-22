
 const config = {
    paypal: {
        env: process.env.REACT_APP_PAYPAL_ENV,
        paypalClient: {
            sandbox:  process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
            production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PROD,
        },
    }  
}
export default config;