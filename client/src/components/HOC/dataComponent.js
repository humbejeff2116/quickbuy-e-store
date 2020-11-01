







import React from 'react';
import { PageLoader } from '../Loader/loader';
// import axios from 'axios'

let i = 0;
let dataI = [
    {id:i++,name:'jeff', price:23,available:true, src:'humbe.jpg'},
    {id:i++,name:'jeff', price:23,available:true, src:'humbe.jpg'},
    {id:i++,name:'jeff', price:23,available:true, src:'humbe.jpg'},
    {id:i++,name:'jeff', price:23,available:true, src:'humbe.jpg'}
]






 const DataComponent = (ComposedComponent, url) =>{
    class DataC extends React.Component{
        constructor(props){
            super(props);
            this.state={
                data:[],
                loading:false,
                fetchErrMssg:''
            
            }

        }
        componentDidMount() {
            this.setState({
                data:dataI
            })
        //     this.setState({
        //         loading:true
        //     })
        // axios.get(url)
        //     .then(response=> response.data)
        //     .then(data=>{
        //         this.setState({
        //             loading:false,
        //             data
        //         })
        //         console.log('returned data is',data)
        //     })
        //     .catch(err=>{
        //         console.error(err);
        //         this.setState({
        //             fetchErrMssg: err
        //         })
        //     }
                
        // )
        
        }
        
        render(){
        
            let {fetchErrMssg} = this.state;
            if(fetchErrMssg){
                return(
                    <div className="error" >
                        <p>An Error occured while getting resource</p>
                        <div className="error-msg">
                            {fetchErrMssg}
                        </div>
                    </div>
                )
            }        
                return(

                    <>
                        {
                            (this.state.loading) ? <PageLoader/> :                           
                            <ComposedComponent {...this.state} {...this.props}/>
                        }

                    </>
                )
            
        }
    }
    return DataC
 }
export default DataComponent;