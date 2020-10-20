



import React from 'react';
import SeeAllComp from '../SeeAllPage/seeAllComponent'
import './popularCollection.css'
import {getPopularCollections} from '../../services/ecormerce.service'
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import {PageTemplate} from '../PageTemplate/pageTemplate'

import {PageLoader} from '../Loader/loader'



export default class PopularCollectionsPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loading:false,
           products:[]
       }
    }
  
   componentDidMount(){
    window.scrollTo(0,0)
       this.setState({loading:true});
       getPopularCollections(20,5)
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
            <div className="popular-collections-items">

            <div className="popular-collections-items-header">
                    <h3>Popular Collection</h3>          
            </div>
            <div  className="popular-collections-items-container">
                <div className="popular-collections-items">
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
