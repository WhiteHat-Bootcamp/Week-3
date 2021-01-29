const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {MenuItem} = require('./MenuItem')
const {loadAndInsert} = require('./populateDB')
const {addRest} = ('./addRest')

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

//allows us to read the form data as if were JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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

//this route adds the menu items to the hyperlinked page 
app.get('/items/:id', async (req, res) => {
    console.log('Got here!');
    const restaurants = await Restaurant.findByPk()
    const menu = await Menu.findByPk(req.params.id);
    const menuItems = await menu.getItems();
    res.render('items', {menu, menuItems})
})

//this route allows us to inser form data
app.get('/addRest', async (req, res) => {
    res.render('addRest')
})

//this route allows us to transfer form data to the webpage
app.post('/newrest', async (req, res) => {
    console.log(req.body); // this is the JSON body
    const restaurant = await Restaurant.create(req.body) //insert data into the database!
    const menu = await Menu.create(req.body)
    res.redirect('/')
})

//this route allows us to delete a restaurant
app.get('/restaurants/:id/delete', (req, res) => {
    Restaurant.findByPk(req.params.id)
        .then(restaurant => {
            restaurant.destroy()
            res.redirect('/')
        })
})

//this route allows us to edit a restaurant
app.get('/restaurants/:id/editRest', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    console.log("HELLO!!!!" + restaurant);
    res.render('editRest', {restaurant})
})

//this route allows us to save the changes
app.post('/restaurants/:id/edited', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update(req.body)
    res.redirect('/')
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})