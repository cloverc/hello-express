const express = require('express')
const helloWorld = require('./controllers/helloWorld');
const bodyParser = require('body-parser')
const createShoppingList = require('./controllers/createShoppingList')
const updateShoppingList = require('./controllers/updateShoppingList');

const app = express()

// middleware
app.use(bodyParser.json())

// route GET
app.get('/', helloWorld)

// route POST
app.post('/shopping-lists', createShoppingList)

// route PUT
app.put('/shopping-lists/:filename', updateShoppingList)


// start web server
app.listen(3000, () => console.log('Example app listening on port 3000!'))