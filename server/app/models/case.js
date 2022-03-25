const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class Case extends Model {
  static async addCase(name, img) {
    return await Case.create({ name, img });
  }

  static async getCases() {
    return await Case.findAll();
  }
}

Case.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING(50),
  img: Sequelize.STRING(100)
}, {
  sequelize,
  tableName: 'case'
})

module.exports = {
  Case
}