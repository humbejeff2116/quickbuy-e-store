



import React  from 'react';




export default function CheckoutButton(props) {
    return (
        <div className="checkout-btn" >
            <button className="btn btn-success float-right" onClick={()=>props.toggleCheckout()}>
                Pay
            </button>
           
            <button onClick={()=>props.cancelPayment()} className="btn btn-danger float-right" style={{ marginRight:"10px" }}>
                Cancel
            </button>
        </div>
    )
}