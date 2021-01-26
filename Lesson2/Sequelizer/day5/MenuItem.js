const {sequelize, Sequelize, DataTypes, Model} = require('./sequelize_index');

/**
 * Represents a Menu
 */
class MenuItem extends Model {

    // add methods here

}

MenuItem.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
}, {
    sequelize,
    timestamps: false
});

module.exports = {
    MenuItem
};

// local testing - remove when using Jest
/*(async () => {
    await sequelize.sync({ force: true });
    const m = await MenuItem.create({ name: 'Lamb Parcels', price: 5.70})
    console.log("Inserted menu item name is:" + m.name);
})();*/



