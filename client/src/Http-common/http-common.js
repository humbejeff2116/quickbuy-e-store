
import axios from 'axios';


export default axios.create({
    baseURL:"https://quickibuy.herokuapp.com/api/v1",
    headers:{
        "content-type":"application/json"
    }
});