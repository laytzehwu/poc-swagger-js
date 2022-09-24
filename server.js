const uuid = require('uuid');
module.exports = function (app) {
	
    app.get('/order/:orderId/status', (req, res) => {
	    // #swagger.tags = ['order']
		// #swagger.description = 'Endpoint to get order status.'
		// #swagger.parameters['orderId'] = { description: 'Order id which can be otained when create order' }
		
		console.log(req.params);
		
		if (false) return res.status(404).send(false);
		
       
		/* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/orderStatus" },
               description: 'Order status and process logs' 
        } */		

        return res.status(200).json({
			status: 'Pending',
			logs:[]
		}).end();
    });
	
	app.post('/order', (req, res) => {
	    // #swagger.tags = ['order']
		// #swagger.description = 'Endpoint to submit order.'

        /* #swagger.parameters['newOrder'] = {
               in: 'body',
               description: 'Order detail including customer id, items and totalAmount.',
               required: true,
               schema: { $ref: "#/definitions/newOrder" }
        } */
		
		const newOrder = req.body;
		let orderAccept = true;
		if (!newOrder.customerId) orderAccept = false;
		if (!newOrder.items || !Array.isArray(newOrder.items)) orderAccept = false;
		else {
			newOrder.items.forEach(item => {
				if (!item.productId) orderAccept = false;
				if (!item.qty) orderAccept = false;
			});
		}
		if (!newOrder.totalAmount) orderAccept = false;
		
		if (!orderAccept) {
			/* #swagger.responses[400] = { 
				   schema: { $ref: "#/definitions/orderError" },
				   description: 'Order submitted payload validation fail' 
			} */		
			return res.status(400).json({
				status: 400,
				description: 'Invalid payload'
			});
		}
		/* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/order" },
               description: 'Complete order payload including orderId' 
        } */		

		return res.status(200).json({
			orderId: "5d269f50-e1e2-4453-a36e-5d6830973167",
			...newOrder
		});
	});

	app.post('/orders', (req, res) => {
	    // #swagger.tags = ['order']
		// #swagger.description = 'Endpoint to submit multiple orders.'

        /* #swagger.parameters['newOrders'] = {
               in: 'body',
               description: 'Multiple order detail including customer id, items and totalAmount.',
               required: true,
               schema: { $ref: "#/definitions/newOrders" }
        } */
		const newOrders = req.body.orders;

		/* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/orders" },
               description: 'Complete order payload including orderId' 
        } */		
		return res.status(200).json({
			orders: newOrders.map(order => {
				return {
					orderId: uuid.v4(),
					...order
				}
			})
		});
		
	});
	
	app.post('/account', (req, res) => {
	    // #swagger.tags = ['account']
		// #swagger.description = 'Endpoint to customer available credit with customerId.'

        /* #swagger.parameters['account'] = {
               in: 'body',
               description: 'Multiple order detail including customer id, items and totalAmount.',
               required: true,
               schema: { $ref: "#/definitions/account" }
        } */
		const account = req.body;
		
		
		/* #swagger.responses[202] = { 
               schema: { $ref: "#/definitions/accountResponse" },
               description: 'Return updated account payload with updating time' 
        } */		
		return res.status(202).json({ code: 202, updatedPayload:{
			...account,
			updateTime: new Date().toISOString()
		}});
	});
	
	app.post('/stock', (req, res) => {
	    // #swagger.tags = ['stock']
		// #swagger.description = 'Endpoint to update product stock quantity.'

        /* #swagger.parameters['stock'] = {
               in: 'body',
               description: 'Multiple order detail including customer id, items and totalAmount.',
               required: true,
               schema: { $ref: "#/definitions/stock" }
        } */
		const stock = req.body;
		
		
		/* #swagger.responses[202] = { 
               schema: { $ref: "#/definitions/accountResponse" },
               description: 'Return updated account payload with updating time' 
        } */		
		return res.status(202).json({ code: 202, updatedPayload:{
			...stock,
			updateTime: new Date().toISOString()
		}});
	});
}