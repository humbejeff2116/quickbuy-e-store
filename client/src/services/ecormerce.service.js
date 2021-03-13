










import http from '../Http-common/http-common'





    // done
   export function getAllProducts(){
        return http.get('/all-Products')
    }
    // done
   export function createAllProducts(data){
        return http.post('/all-Products', data)

    }
   export function deleteAllProducts(){
        return http.delete(`/all-Products`)

    }

    // done
 export function updateProduct(id,data){
    return http.put(`/all-products/:${id}`, data)

  }
   export function getproduct(id){
        return http.get(`/all-products/:${id}`)
    }
   export function deleteProduct(id){
        return http.delete(`/all-Products/:${id}`)

    }
  
// done
  export function  getLatestDeals(limit,skip){
        return http.get(`/latest-deals?limit=${limit}&skip=${skip}`)

    }

//   done
  export function  getPopularCollections(limit,skip){
        return http.get(`/popular-collections?limit=${limit}&skip=${skip}`)

    }
    // done
  export function  getWomenCollections(limit,skip){
        return http.get(`/women-collections?limit=${limit}&skip=${skip}`)

    }
    // done
  export function  getMenCollections(limit,skip){
        return http.get(`/men-collections?limit=${limit}&skip=${skip}`)

    }

  export function  searchProduct(data){
        return http.get(`/search?q=${data.searchValue}`)
    }

    // export function searchProducts(data){
    //     return http.post(`/all-products`,data)
    // }

// done
export function getCartProducts(cart) {
   
    return http.post(`/cart`, {cart})
          
}

// signup
export function signup(data) {
    const body = {

        firstname: data.firstname,
        lastname:data.lastname,
        email:data.email,
        phonenumber:data.phonenumber,
        password: data.password,
        password2:data.password2
    }

   return http.post(`/users/signup`,body)

}

// done
export function login (data) {

    return http.post(`/login`, { email: data.email, password: data.password });

}
// not done
export function pay (data) {
    // use axios here as iam sending params to the server
    return http.get(`/pay`, { totalAmount: data.totalAmount, params: { 'x-access-token': localStorage.getItem('x-access-token')} })
           
}
// done
export function isAuthenticated(){ 

    return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()

}
export function getAccessories(limit,skip){
    return http.get(`/accessories?limit=${limit}&skip=${skip}`)
}
export function getJewelries(limit,skip){
    return http.get(`/jewelries?limit=${limit}&skip=${skip}`)
}

// dashboard sidenav links
// post orders
export function postOrders(payment,user,products,total){
    const order ={
   
           payment:payment,
           user:user,
           products:products,
           total:total,
   
       }
   
       return http.post(`/orders`,order)
   }
export function getOrders(user){

    return http.get(`/users/orders`,user)
} 

export function postSubscription(data){
   
    return http.post(`/subscription`,data)
    
}
export function checkToken(credentails){
    return http.post(`/authenticate?x-access-token=${credentails}`)
}

