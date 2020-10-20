







//  users collection to staore users data
//  products collection to store products
// payments collection to store users payment for later use

// keep everything in in the products collection and give it a tag so as to use it to query document
// query popular collection data for see all
//  db.products.aggregate([{$match:{tag:"popular collection"}}])

let popularCollectionData = [ 

    {
         tag:"popular collection",
        src:"images/pics1.jpg",
        name:"shirt-blue"
    },
    {
        tag:"popular collection",
       src:"images/pics2.jpg",
       name:"shirt-blue"
   },
   {
    tag:"popular collection",
   src:"images/pics3.jpg",
   name:"shirt-blue"
},
{
    tag:"popular collection",
   src:"images/pics4.jpg",
   name:"shirt-blue"
},
{
    tag:"popular collection",
   src:"images/pics5.jpg",
   name:"shirt-blue"
},
{
    tag:"popular collection",
   src:"images/pics6.jpg",
   name:"shirt-blue"
},
{
    tag:"popular collection",
   src:"images/pics7.jpg",
   name:"shirt-blue"
},
{
    tag:"popular collection",
   src:"images/pics8.jpg",
   name:"shirt-blue"
},
{
    tag:"popular collection",
   src:"images/pics9.jpg",
   name:"shirt-blue"
},
{
    tag:"popular collection",
   src:"images/pics10.jpg",
   name:"shirt-blue"
},
{
    tag:"popular collection",
   src:"images/pics11.jpg",
   name:"shirt-blue"
},
{
    tag:"popular collection",
   src:"images/pics12.jpg",
   name:"shirt-blue"
},

]

let latestDealsData = [
    {
        tag:"latest deals",
       src:"images/pics1.jpg",
       name:"shirt-blue"
   },
   {
    tag:"latest deals",
   src:"images/pics2.jpg",
   name:"shirt-blue"
},
{
    tag:"latest deals",
   src:"images/pics3.jpg",
   name:"shirt-blue"
},
{
    tag:"latest deals",
   src:"images/pics4.jpg",
   name:"shirt-blue"
},

        ]


let womenCollectionData = [

    {
        tag:"women collection",
       src:"images/pics1.jpg",
       name:"shirt-blue"
   },
   {
    tag:"women collection",
   src:"images/pics2.jpg",
   name:"shirt-blue"
},
{
    tag:"women collection",
   src:"images/pics3.jpg",
   name:"shirt-blue"
},
{
    tag:"women collection",
   src:"images/pics4.jpg",
   name:"shirt-blue"
},

        ]



let menCollectionData = [

    {
        tag:"men collection",
       src:"images/pics1.jpg",
       name:"shirt-blue"
   },
   {
    tag:"men collection",
   src:"images/pics2.jpg",
   name:"shirt-blue"
},
{
    tag:"men collection",
   src:"images/pics3.jpg",
   name:"shirt-blue"
},
{
    tag:"men collection",
   src:"images/pics4.jpg",
   name:"shirt-blue"
},
    ]



let singleCollectionData =  [ 
    {
        tag:"single collection",
       src:"images/pics1.jpg",
       name:"shirt-blue"
   },
   {
    tag:"single collection",
   src:"images/pics2.jpg",
   name:"shirt-blue"
},
{
    tag:"single collection",
   src:"images/pics3.jpg",
   name:"shirt-blue"
},
{
    tag:"single collection",
   src:"images/pics4.jpg",
   name:"shirt-blue"
},
{
    tag:"single collection",
   src:"images/pics5.jpg",
   name:"shirt-blue"
},
{
    tag:"single collection",
   src:"images/pics6.jpg",
   name:"shirt-blue"
},
                                                        
        ]






        let daata = [
            
            {
                popularCollectionData :[ 
                
                    { "src":"images/picsi.jpg"}, {"src":"images/pics2.jpg"}, {"src":"images/pics3.jpg"},
                    {"src":"images/pics4.jpg"}, { "src":"images/picsi.jpg"}, {"src":"images/pics2.jpg"},
                    {"src":"images/pics3.jpg"}, {"src":"images/pics4.jpg"}, { "src":"images/picsi.jpg"},
                    {"src":"images/pics2.jpg"}, {"src":"images/pics3.jpg"}, {"src":"images/pics4.jpg"}                                              
                ],
            
                latestDealsData : [
                    { "src":"images/picsi.jpg","name":"short gown"},
                    {"src":"images/pics2.jpg","name":"suit"},
                    {"src":"images/pics3.jpg","name":"bikini"},
                    {"src":"images/pics4.jpg","name":"gown"}
                ],
        
                womenCollectionData :  [
                    { "src":"images/picsi.jpg"},
                    {"src":"images/pics2.jpg"},
                    {"src":"images/pics3.jpg"},
                    {"src":"images/pics4.jpg"}
                ],
            
                menCollectionData : [
                    { "src":"images/picsi.jpg"},
                    {"src":"images/pics2.jpg"},
                    {"src":"images/pics3.jpg"},
                    {"src":"images/pics4.jpg"}
                ],
            
                singleCollectionData : [ 
                    { "src":"images/picsi.jpg"}, {"src":"images/pics2.jpg"}, {"src":"images/pics3.jpg"},
                    {"src":"images/pics4.jpg"}, { "src":"images/picsi.jpg"}, {"src":"images/pics2.jpg"}
                                                                
                ]
            
            }

        ];
