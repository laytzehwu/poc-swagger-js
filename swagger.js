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
            "description": "Endpoints"
        }
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
			$productId: 456,
			$qty: 1
		},
		order: {
			orderId: 100,
			$customerId: 123,
			$items: [{ $ref: '#/definitions/orderItem'}],
			$totalAmount: 100.50
		},
		orderError: {
			$status: 400,
			$description: 'Invalid order payload'
		},
        newOrder: {
			$customerId: 123,
			$items: [{ $ref: '#/definitions/orderItem'}],
			$totalAmount: 100.50
        },
		orderStatus: {
			description: 'Accepted',
			logs: [
				'Sufficient account balance',
				'Sufficient stock'
			]
		}
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})