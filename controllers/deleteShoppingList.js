const fs = require('fs');
const path = require('path');

function deleteShoppingList(req, res) {
  const filename = req.params.filename

	fs.unlink(path.join(__dirname, 'shoppingLists', filename), (err) => {
		if (err) throw err;
	
		res.send({ success: true })
	})
}

module.exports = deleteShoppingList;