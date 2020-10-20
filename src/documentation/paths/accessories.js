














module.exports ={
    get: {
      summary: 'Lists all the  products with accessories tag',
      tags: ['CRUD operations'],
      description: 'Get accessories',
      operationId: 'getAccessories',
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
          description: 'accessories were obtained',
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
                message: 'request path is incorrect',
                internal_code: 'missing_parameters'
              }
            }
          }
        },
        '404':{
          description: 'accessories not found.'
        }
      }
    }

  }