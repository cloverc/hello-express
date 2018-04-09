const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const deleteShoppingList = require('../controllers/deleteShoppingList');

it('deletes an existing shopping list', (done) => {
	expect.assertions(1);
	
	const filename = Date.now().toString()
	const filepath = path.join(__dirname, '../controllers/shoppingLists', filename)

	fs.writeFile(filepath, 'Delete me', (err) => {
		const request  = httpMocks.createRequest({
			method: 'DELETE',
			url: '/shopping-lists/:filename',
			params: {
				filename: filename
			},
		});		
		// mock response object
		const response = httpMocks.createResponse({
			eventEmitter: require('events').EventEmitter
		});

		// pass in mock request and response objects
		deleteShoppingList(request, response);

		response.on('end', () => {
      fs.stat(filepath, (error, stats) => {
        expect(error.code).toBe('ENOENT');
        done();
      });
    });
	});
});