









import React from 'react';
import SeeAllComp from '../SeeAllPage/seeAllComponent'
import './menCollection.css'
import {getMenCollections} from '../../services/ecormerce.service'
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import {PageTemplate} from '../PageTemplate/pageTemplate'

import {PageLoader} from '../Loader/loader'




export default class MenCollectionsPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loading:false,
           products:[]
       }
    }
  
   componentDidMount( ){
       window.scrollTo(0,0)
       this.setState({loading:true});

       getMenCollections(20,5)
       .then(response=> response.data)
       .then(products=> this.setState({
           loading:false,
           products
       }))
   }
   componentDidUpdate(prevProps, prevState) {
       window.scrollTo(0,0)
   }
   
render(){
        return(
            <PageTemplate>
          
              

            <ErrorBoundary>
                  { (this.state.loading) && (<PageLoader/>) }
            <div className="men-collections-items">

            <div className="men-collections-items-header">
                    <h3>Men Collections</h3>          
            </div>
            <div  className="men-collections-items-container">
                    <div className="men-collections-items">
                        {   
                          

                            this.state.products.map( (product,i)=>
                                < SeeAllComp  key ={i} {...product} />

                                )

                        }
                    </div>
            
            </div>
            </div>
            </ErrorBoundary>
            </PageTemplate>
           
        )
    }
}
