const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./server.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "Order Capture",
        description: "To capture order and track order status"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "order",
            "description": "Endpoints to capture order and check order status"
        },
		{
			"name": "account",
			"description": "Endpoint to update customer available credit"
		},
		{
			"name": "stock",
			"description": "Endpoint to update product quantity"
		},
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api_key",
            in: "header"
        },
        petstore_auth: {
            type: "oauth2",
            authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
            flow: "implicit",
            scopes: {
                read_pets: "read your pets",
                write_pets: "modify pets in your account"
            }
        }
    },
    definitions: {
		orderItem: {
			$productId: "456",
			$qty: 1
		},
		orderItem2: {
			$productId: "789",
			$qty: 2
		},
		order: {
			orderId: "5d269f50-e1e2-4453-a36e-5d6830973167",
			$customerId: "aaa789",
			$items: [{ $ref: '#/definitions/orderItem'}],
			$totalAmount: 100.50
		},
		orders: [{
			orderId: "5d269f50-e1e2-4453-a36e-5d6830973167",
			$customerId: "aaa789",
			$items: [{ $ref: '#/definitions/orderItem'}],
			$totalAmount: 100.50
		},{
			orderId: "5d269f50-e1e2-4453-a36e-5d6830973167",
			$customerId: "bbb968",
			$items: [{ $ref: '#/definitions/orderItem2'}],
			$totalAmount: 100.50
		},],
		orderError: {
			$status: 400,
			$description: 'Invalid order payload'
		},
        newOrder: {
			$customerId: "aaa789",
			$items: [{ $ref: '#/definitions/orderItem'}],
			$totalAmount: 100.50
        },
		newOrder2: {
			$customerId: "bbb968",
			$items: [
				{ $ref: '#/definitions/orderItem'},
				{ $ref: '#/definitions/orderItem2'}
			],
			$totalAmount: 100.50
		},
		newOrders: {
			$orders: [
				{ $ref: "#/definitions/newOrder" },
				{ $ref: "#/definitions/newOrder2" },
			],
		},
		orderStatus: {
			status: 'Accepted',
			logs: [
				'Sufficient account balance',
				'Sufficient stock'
			]
		},
		account: {
			$customerId: 'bbb968',
			$balance: 1000
		},
		accountResponse: {
			code: 202,
			updatedPayload: {
				customerId: 'bbb968',
				balance: 1000,
				updateTime: new Date().toISOString()
			}
		},
		stock: {
			$productId: '456',
			$balance: 100
		},
		stockResponse: {
			code: 202,
			updatedPayload: {
				$productId: '456',
				$balance: 100,
				updateTime: new Date().toISOString()
			}
		}
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})