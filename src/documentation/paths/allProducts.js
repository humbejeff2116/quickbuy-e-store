







module.exports ={
    postAndGet:{
        post: {
            summary:'creates a new product',
            tags: ['CRUD operations'],
            description: 'Create product',
            operationId: 'createProduct',
            parameters: [],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              },
              required: true
            },
            responses: {
              '201': {
                description: 'New product was created'
              },
              '400': {
                description: 'Invalid parameters',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    },
                    example: {
                      message: 'product with id 10  already exist',
                      internal_code: 'invalid_parameters'
                    }
                  }
                }
              }
            }
          },
          get: {
            summary: 'Lists all the products',
            tags: ['CRUD operations'],
            description: 'Get Products',
            operationId: 'getProducts',
            parameters: [
              {
                name: 'product-id',
                in: 'header',
                schema: {
                  $ref: '#/components/schemas/id'
                },
                required: true,
                description: 'product id '
              },
              {
                name: 'page',
                in: 'query',
                schema: {
                  type: 'integer',
                  default: 1
                },
                required: false
              },
              {
                name: 'orderBy',
                in: 'query',
                schema: {
                  type: 'string',
                  enum: ['asc', 'desc'],
                  default: 'asc'
                },
                required: false
              }
            ],
            responses: {
              '200': {
                description: 'Products were obtained',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Products'
                    }
                  }
                }
              },
              '400': {
                description: 'Missing parameters',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    },
                    example: {
                      message: 'ProductId is missing',
                      internal_code: 'missing_parameters'
                    }
                  }
                }
              }
            }
          },
         

    },
    updateAndDelete:{
        put:{
            summary:'updates a product',
            tags: ['CRUD operations'],
            description: 'update product',
            operationId: 'updateProduct',
            parameters: [
                {
                    name: 'product-id',
                    in: 'path',
                    schema: {
                        type:'integer',
                      $ref: '#/components/schemas/id'
                    },
                    required: true,
                    description: 'product id '
                  },

            ],
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Product'
                  }
                }
              },
              required: true
            },
            responses: {
              '204': {
                description: 'product was updated'
              },
              '400': {
                description: 'Invalid parameters',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    },
                    example: {
                      message: 'product with that id does not exist',
                      internal_code: 'invalid_parameters'
                    },
                    '404':{
                        message:'product not found'
                    }
                  }
                }
              }
            }

        },
        delete:{
            summary:'deletes a product',
            tags: ['CRUD operations'],
            description: 'delete product',
            operationId: 'deleteProduct',
            parameters: [
                {
                    name: 'product-id',
                    in: 'path',
                    schema: {
                        type:'integer',
                      $ref: '#/components/schemas/id'
                    },
                    required: true,
                    description: 'product id '
                  },

            ],
            responses: {
              '200': {
                description: 'product was deleted'
              },
              '400': {
                description: 'Invalid parameters',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error'
                    },
                    example: {
                      message: 'product with that id does not exist',
                      internal_code: 'invalid_parameters'
                    },
                    '404':{
                        message:'product not found'
                    }
                  }
                }
              }
            }

        }

    }
    
   
}