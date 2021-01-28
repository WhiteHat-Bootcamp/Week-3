const {sequelize, Sequelize, DataTypes, Model} = require('./sequelize_index');
const {MenuItem} = require('./MenuItem')

/**
 * Represents a Menu
 */
class Menu extends Model {

    // add methods here

}

Menu.init({
    title: DataTypes.STRING}, {
    sequelize,
    timestamps: false
});

Menu.hasMany(MenuItem, {as: 'items', foreignKey: 'menu_id'});
MenuItem.belongsTo(Menu, {foreignKey: 'menu_id'});

module.exports = {Menu};

// local testing - remove when using Jest
/*(async () => {
    await sequelize.sync({ force: true });
    const m = await Menu.create({ title: 'Grill'})
    console.log("Inserted menu title is:" + m.title);
})();*/



