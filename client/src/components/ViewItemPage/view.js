
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ViewItemCard from './viewItemCard';
import { PageTemplate } from '../PageTemplate/pageTemplate';
import { Loader } from '../Loader/loader';
import ViewAlertBox from './viewModalBox';
import { ViewOkAlertBox } from './viewModalBox';
import BackButton from '../BackButton/backButton';
import MyContext from '../Context/context';
import './view.css';
const cartIcon = <FontAwesomeIcon  icon={['fas', "shopping-cart"]}  />



export function View( ) { 
    const [viewProduct, setViewProduct] = useState([]);
    const [loading] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [mssg, setMssg] = useState(false);
    const [cartMssg, setCartMssg] = useState('');
    const [err, setErr] = useState(false);
    const [errMssg, setErrMssg] = useState('');

    useEffect(()=> {
        const viewItem =  localStorage.getItem('view') ? JSON.parse(localStorage.getItem('view')) : [];
        setViewProduct(viewItem);
        window.scrollTo(0,0);
        if(err) {
            closeError();
        }
        if(mssg) {
            closeMessageModal();
        }
    },[err,mssg]);
    const closeError = ( ) => { 
         setTimeout(()=>setErr(false),4000);   
    }
    const  closeMessageModal = ( ) => {
        setTimeout(()=>setMssg(false),4000);

    }
    const hideModal = ( ) => {
        setErr(false);
        setMssg(false);
        setCartMssg('');
        setErrMssg(''); 
    }
    const handleInputChange = e => {
        if (isNaN(e.target.value) || !e.target.value) {
            setErr(true);
            setErrMssg('quantity is expected to be a number');
            return;       
        }  
        setQuantity(parseInt(e.target.value));
    }

    if ((!err && viewProduct.length < 1) || loading) {
        return(
            <PageTemplate>
            <div className="view-container">
                <BackButton buttonDivClassName="view-back-bttn"/>
                <div className="view-item-container">
                    <Loader/> 
                </div>               
                <div className="view-item-alert">
                </div>
            </div>   
            </PageTemplate>
        )
    }
    return (
        <MyContext.Consumer>
            {context => (
                <PageTemplate>
                <div className="view-container">
                <BackButton buttonDivClassName="view-back-bttn"/>
                    <div className="view-item-container">
                    <BackButton buttonDivClassName="mobile-view-back-bttn"/>
                    {
                        viewProduct.map((product, i) =>
                            <ViewItemCard 
                            key={i} 
                            {...product} 
                            quantity={quantity}
                            addToCart={context.addToCart} 
                            cartIcon={cartIcon} 
                            handleInputChange={handleInputChange}
                            setQuantity ={setQuantity}
                            setSize ={setSize}
                            selectedSize={size} 
                            setErr={setErr}
                            setErrMssg={setErrMssg}
                            setMssg={setMssg}
                            setCartMssg={setCartMssg} 
                            />  
                        )
                    }
                    </div>
                    <div className="view-item-alert">
                   
                    {
                    (err) && (
                       
                        <ViewAlertBox 
                        show={err}
                        hideModal={hideModal}
                        message={errMssg}
                        />
                        
                    )
                }
                {
                    (mssg && !err) && (
                        
                        <ViewOkAlertBox
                        show={mssg }
                        hideModal={hideModal}
                        message={cartMssg}
                        />
                      
                    )
                }
                 </div>
                   
                </div>
                </PageTemplate>

            )}
        </MyContext.Consumer>
       
    )
}