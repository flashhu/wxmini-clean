const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Address } = require('./address')

class ServiceOrder extends Model {
  /**
   * @param {*} user_id
   * @param {*} params { offset, limit }
   * @returns
   */
  static async getOrderList(user_id, params = {}) {
    return await ServiceOrder.findAndCountAll({
      where: { user_id },
      ...params,
      include: [{
        model: Address,
        as: 'address',
        attributes: { exclude: ['user_id', 'is_default'] }
      }],
      attributes: ['id', 'type', 'area', 'point', 'tech_type', 'is_insure', 'date', 'sum_price', ['created_at', 'create_date']]
    })
  }

  /**
   * @param {number} user_id
   * @param {number} address_id
   * @param {object} params {type: 'g', area: '110.11', point: '', tech_type: '0', is_insure: true, sum_price: 11}
   * @returns
   */
  static async addOrder(user_id, address_id, params) {
    return await ServiceOrder.create({
      user_id,
      address_id,
      ...params
    });
  }
}

ServiceOrder.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 减少多次聚合的开销
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // 地址已关联用户
  address_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: Sequelize.STRING(10),
  area: Sequelize.STRING(10),
  point: Sequelize.STRING(5),
  // 0: 中+高  1: 高+高
  tech_type: Sequelize.STRING(5),
  is_insure: Sequelize.BOOLEAN,
  date: Sequelize.STRING(15),
  sum_price: Sequelize.STRING(20)
}, {
  sequelize,
  tableName: 'service_order'
})

module.exports = {
  ServiceOrder
}