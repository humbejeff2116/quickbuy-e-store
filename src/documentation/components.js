


module.exports = {
    schemas: {
      id:{
        type:'string',
        description: 'The auto-generated id of the product'  
      },
      Product: {
        type: 'object',
        properties: {
          id:{
            $ref: '#/components/schemas/id'
      },
      name:{
        type: 'string',
        description: 'The name of the product'

      },
      src:{
        type: 'string',
        description: 'the path/src of the product picture'
      },
      price:{            
        type: 'string',
        description: 'the price of the product'
       },
       available:{
        type: 'boolean',
        description: 'the availability of a product'
      },
      category:{
        type: 'string',
        description: 'the category the product falls under'            
             
      } ,
      description:{
        type: 'string',
        description: 'the description of the product'            
             
      } ,
      tags:{
        type:'array',
        items: {
          type: 'string',
         
        }
      },
      createdAt:{
        type: 'string',
        format: 'date',
        description: 'The date of the product creation.'
      },     
        }
      },
    Products: {
        type: 'object',
        properties: {
          products: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Product'
            }
          }
        }
      },
      User:{
        type: 'object',
        properties:{
          firstname:{
            type: 'string' ,
            description: 'The first name of the user',
             required:true
            },
            lastname:{
              type: 'string' ,
              description: 'The last name of the user',
               required:true
              },
            email:{
              type: 'string', 
              required: true, 
              unique: true
            },
            phonenumber:{
              type: 'string', 
              required: true, 
              unique: true
            },
            password:{
              type: 'string' ,
               required: true,
               description: 'The password of the user' 
              },
            profileimage:{
              type: 'string',
              description: 'The users profile image'
            },
            
            createdAt:{ 
                type: 'string',
                format: 'date',
                description: 'The date of user creation.'
                }  
        }
      },
      Users:{
        type:'object',
        properties:{
          users: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/User'
            }
          }
        }

        },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          internal_code: {
            type: 'string'
          }
        }
      }
    }
  }