const {sequelize} = require('./sequelize_index');
const {Restaurant} = require('./Restaurant');
const {Menu} = require('./Menu');
const {MenuItem} = require('./MenuItem')
const fsp = require('fs').promises; // Node.js file system module with promises


async function loadBySQL() 
{
    const buffer = await fsp.readFile('./restaurants.json'); //call the readFile method from the fsp module and wait for that to load before the next step
    const restaurantz = (JSON.parse(String(buffer))); //Make the content JS and save in a variable
    console.log(restaurantz);

    //recreate the database tables
    await sequelize.sync({force:true}); 
    
    /*Insert rows for the restaurants table with for loop */
    
    let menuCounter = 1; 

    for (let i=0; i < restaurantz.length; i++)
    {
        await Restaurant.create({name: restaurantz[i].name, image: restaurantz[i].image});
    
        // /*Insert rows for Menu table */
        let R_index = i+1;
        for (let j=0; j < restaurantz[i].menus.length; j++)
        {
            await Menu.create({restaurant_id: R_index, title: restaurantz[i].menus[j].title});
    
            // /*Insert rows for the Menu Items table */
            M_index = menuCounter; 
            
            for (let k=0; k < restaurantz[i].menus[j].items.length; k++)
            {
                await MenuItem.create({menu_id: M_index, name: restaurantz[i].menus[j].items[k].name, price: restaurantz[i].menus[j].items[k].price});
            }   

            menuCounter++;
        }
    }    
}

module.export = loadBySQL;

loadBySQL();




