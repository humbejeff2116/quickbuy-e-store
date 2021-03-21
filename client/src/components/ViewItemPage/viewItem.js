
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const cart = <FontAwesomeIcon  icon={['fas', "shopping-cart"]}  />
import PropTypes from 'prop-types'




 export class ViewItem extends React.Component {
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
            err: null,
            mssg:null
        }
    }
    
    handleInputChange = e => 
        this.setState({[e.target.name]: e.target.value})

    addToCart = (id) => {
        let buying_quantity
      let stateQnty = this.state.quantity;
      let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
      if(stateQnty < 1) {
        let err ='quantity is not expected to be less than 1';
        this.setState({
          err,
          mssg:null
        })
        return;
      }
        cart[id] = cart[id] ? cart[id]: 0;
        buying_quantity = cart[id] + parseInt(this.state.quantity,10);
         cart[id] = buying_quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        this.setState({
            err:null,
            mssg:'item added to cart sucessfully'
          })
    }
    render() {
        const {src, name, price, description, id} = this.props;
        return(
            <div className="view-container" >
            <div className="view-item-container">
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
                        {
                            (this.state.err) ?<div className="item-error"> <p className="error-msg">{this.state.err}</p></div>:''
                        }
                        {
                            (this.state.mssg)? <div className="item-mssg-cont" ><p className="cart-item-mssg" >{this.state.mssg}</p></div>:''
                        }
                        <div className="view-button">
                            <button   onClick={()=>this.addToCart(id.toString())}><i>{cart}</i>Add to cart</button>
                            <input type="number" value={this.state.quantity} name="quantity" 
                            onChange={this.handleInputChange} className="float-right"  />
                        </div>
                    </div>
                </div>
                <div className="view-foot">
                    <p>{description}</p>
                </div>  
            </div>
            </div>   
        )
    }
}