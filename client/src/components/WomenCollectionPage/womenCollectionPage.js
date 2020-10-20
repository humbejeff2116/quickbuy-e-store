







import React from 'react';
import SeeAllComp from '../SeeAllPage/seeAllComponent'
import './womenCollection.css'
import {getWomenCollections} from '../../services/ecormerce.service'
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import {PageLoader} from '../Loader/loader'
import {PageTemplate} from '../PageTemplate/pageTemplate'





export default class WomenCollectionsPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loading:false,
           products:[]
       }
    }
  
   componentDidMount(){
        window.scrollTo(0,0)
       this.setState({ loading:true});
       getWomenCollections(20,5)
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
            <div className="women-collections-items">

            <div className="women-collections-items-header">
                    <h3>Women Collections</h3>          
            </div>
            <div  className="women-collections-items-container">
                <div className="women-collections-items">
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
