








import React from 'react'
import LinksPage from '../LinksPage/linksPage'
import { PageLoader } from '../Loader/loader';
import {getAccessories} from '../../services/ecormerce.service'
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import './accessories.css'
import {PageTemplate} from '../PageTemplate/pageTemplate'
// import {Header} from '../Header/index'



export default class AccessoriesPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loading:false,
            products:[]
        }
    }
    componentDidMount(){
        window.scrollTo(0,0);

        this.setState({
            loading:true
        })

        getAccessories(20,5)
        .then(response=> response.data)
        .then(products=>{
            this.setState({
               products,
                loading:false
            })
        })
    }
    componentDidUpdate(){
        window.scrollTo(0,0);
    }
    render(){

        return (
           
                // <ErrorBoundary>
                <PageTemplate>
                <>
                {/* <Header /> */}
                { (this.state.loading) && <PageLoader/> }
            <div className="accessories-container">

            <div className="accessories-items-header">
                    <h3>Accessories</h3>          
            </div>
            <div  className="accessories-items-container">
                <div className="accessories-items">
                    {
                        this.state.products.map((product,i)=>
                            <LinksPage  key={i} {...product}/>
                            )
                    }
                </div> 
            </div>
            </div>
            </>
            </PageTemplate>
                // </ErrorBoundary>
         
         
        )
    }

}