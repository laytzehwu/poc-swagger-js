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
	
	app.post('/order/', (req, res) => {
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
			orderId: 100,
			...newOrder
		});
	});

}