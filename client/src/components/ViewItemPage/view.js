








import React from 'react';
import {ViewItem} from './viewItem';
import './view.css';
import {PageTemplate} from '../PageTemplate/pageTemplate'

import { PageLoader } from '../Loader/loader';




export class View extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            viewItem:[],
           
      }
  
    }
    componentDidMount() {
        window.scrollTo(0,0)
        let viewItem = localStorage.getItem('view')? JSON.parse(localStorage.getItem('view')) : [];
        this.setState({
            viewItem
        })

    }
    // componentDidUpdate(prevProps, prevState) {
    //     window.scrollTo(0,0)
    // }
    componentWillUnmount() {
        localStorage.removeItem('view');
            
    }
   
    
    
  
    render(){
        const { viewItem } = this.state;
        return(
            <PageTemplate>
            <>
         
            { (this.state.loading) && (<PageLoader />) }

            {
                (viewItem.length === 0 ) ?<p>please click on a specific item to view</p> :
                viewItem.map((item,i)=>
                <ViewItem key={i} {...item} />
               )
            }
            </>
            </PageTemplate>
      
        )
    }
}




