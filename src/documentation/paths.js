









module.exports ={
    '/all-products': require("./paths/allProducts").postAndGet,
    '/all-products/:id': require("./paths/allProducts").updateAndDelete,
    '/latest-deals': require("./paths/latestDeals") ,
    '/women-collections':require("./paths/womenCollections"),
    '/men-collections':require("./paths/menCollections"),
    '/popular-collections':require("./paths/womenCollections"),
    '/accessories':require("./paths/accessories"),
    '/jewelries':require("./paths/jewelries"),
    '/users/signup':require("./paths/userSignup"),
    '/subscription':require("./paths/subscription"),
    '/login':require("./paths/login"),





  }