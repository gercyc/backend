const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './teste_info.db'
});
sequelize.sync();
module.exports = sequelize;