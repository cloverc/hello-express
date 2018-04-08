const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const updateShoppingList = require('../controllers/updateShoppingList');

it('updates an existing shopping list', (done) => {
	expect.assertions(1);
	
	const filename = Date.now().toString()
	const filepath = path.join(__dirname, '../controllers/shoppingLists', filename)

	const body = {
		items: ['carrots', 'crunchies', 'cornflakes']
	}

	fs.writeFile(filepath, JSON.stringify(body), (err) => {
		const request  = httpMocks.createRequest({
			method: 'PUT',
			url: '/shopping-lists/:filename',
			params: {
				filename: filename
			},
			body: body
		});		
		// mock response object
		const response = httpMocks.createResponse({
			eventEmitter: require('events').EventEmitter
		});

		// pass in mock request and response objects
		updateShoppingList(request, response);

		response.on('end', () => {
      fs.readFile(filepath, 'utf8', (error, data) => {
        expect(data).toBe(JSON.stringify(request.body));
        done();
      });
    });
	});
});