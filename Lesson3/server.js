const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {MenuItem} = require('./MenuItem')
const {loadAndInsert} = require('./populateDB')

const app = express();
const port = 3000;

// setup our templating engine
const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')

// serve static assets from the public/ folder
app.use(express.static('public'));

// this route matches any GET request to the http://localhost:3000
app.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll({
        include: [
            {
                model: Menu, as: 'menus'
            }
        ],
        nest: true
    })
    res.render('home', { restaurants })
})

app.get('/items/:id', async (req, res) => {
    console.log('Got here!');
    const restaurants = await Restaurant.findByPk()
    const menu = await Menu.findByPk(req.params.id);
    const menuItems = await menu.getItems();
    res.render('items', {menu, menuItems})
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})