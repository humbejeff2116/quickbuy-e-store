
import React from 'react';
import axios from 'axios'





 const DataComponent = (ComposedComponent, url) => {
    class DataComponentChild extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                data:[],
                loading:false,
                fetchErrMssg:''
            }
        }
        componentDidMount() {
            this.setState({
                loading:true
            })
            axios.get(url)
            .then(response => response.data)
            .then(data => {
                this.setState({
                    loading:false,
                    data:data.data
                })
            })
            .catch(err => {
                this.setState({
                    fetchErrMssg: err
                })
            })
        }
        
        render() {
            let {fetchErrMssg} = this.state;
            if(fetchErrMssg) {
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
                        <ComposedComponent {...this.state} {...this.props}/>
                    }
                </>
            )           
        }
    }
    return DataComponentChild;
 }
export default DataComponent;