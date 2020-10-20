




import React from 'react';
// import PropTypes from 'prop-types'




 export class ViewItem extends React.Component{
    // static propTypes = {
    //     src:PropTypes.string.isRequired,
    //     name:PropTypes.string.isRequired,
    //     price:PropTypes.number.isRequired,
    //     id:PropTypes.string.isRequired
    //   };

    constructor(props){
        super(props);
        this.state={
            quantity: 1,
            err: null
        }
    }
    
    handleInputChange = event => 
  
        this.setState({[event.target.name]: event.target.value})
  
    addToCart = (id) => {
     
      let stateQnty = this.state.quantity;
      let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
      // validate to make sure quantity is not less than 1 and if so stop function
      if(stateQnty < 1) {

        let err ='quantity is not expected to be less than 1'
        this.setState({
          err
        })
        return;

      }
        cart[id] = cart[id] ? cart[id]: 0;
  
        let buying_quantity = cart[id] + parseInt(this.state.quantity,10);
    
         cart[id] = buying_quantity
        
        localStorage.setItem('cart', JSON.stringify(cart));
       

    }
 
    
    render() {

        const {src,name,price,id} = this.props;
        return(
             // display container flex:column
            <div className="view-container" >
            <div className="view-item-container">
                {/* 1 div */}
                {/* display flex-direction row */}
                <div className="view-main">
              

                    <div className="view-image">

                        <img src ={src} width="85%;" height="80%" alt="clothing" />

                    </div>

                    <div className="view-content">
                   

                        <div className="item-name">
                        <p>product name: {name} </p>
                        </div>
                        <div className="item-price" >
                        <p className="product-price">price: ${price}</p>
                        </div>
                        {/* flex row */}
                        {

                        (this.state.err) ?<div className="item-error"> <p className="error-msg">{this.state.err}</p></div>:''

                        }
                        <div className="view-button">
                        <button   onClick={()=>this.addToCart(id.toString())}>Add to cart</button>
                        <input type="number" value={this.state.quantity} name="quantity" 
                        onChange={this.handleInputChange} className="float-right"  />
                        </div>

                    </div>

                </div>

                {/* 2 div */}
                <div className="view-foot">

                </div>
              
            </div>
            </div>
             
        )
    }
}

