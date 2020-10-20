








import React from 'react'
import LinksPage from '../LinksPage/linksPage'
import { PageLoader } from '../Loader/loader';
import {getJewelries} from '../../services/ecormerce.service'
import './jewelries.css'
import {PageTemplate} from '../PageTemplate/pageTemplate'
// import {Header} from '../Header/index'



export default class JewelriesPage extends React.Component{

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

        getJewelries(20,5)
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
            <PageTemplate>
                {/* <Header/> */}
          
                <>
                { (this.state.loading) && <PageLoader/> }
                <div className="jewelries-container">
                <div className="jewelries-items-header">
                        <h3>Jewelries</h3>          
                </div>
                <div  className="jewelries-items-container">
                    <div className="jewelries-items">
                  
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

          
         
        )
    }

}