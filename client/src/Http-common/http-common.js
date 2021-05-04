
import axios from 'axios';

// const URI= `http://localhost:4000`;
const URI = `https://quickibuy.herokuapp.com`;
export default axios.create({
    baseURL:`${URI}/api/v1`,
    headers:{
        "content-type":"application/json"
    }
});