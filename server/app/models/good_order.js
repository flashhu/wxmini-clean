// 商品订单表
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Address } = require('./address')
const { GoodOrderDetail } = require('./good_order_detail')
const { Good } = require('./good')

class GoodOrder extends Model {
  /**
   * @param {*} user_id
   * @param {*} params { offset, limit }
   * @returns
   */
  static async getOrderList(user_id, params = {}) {
    return await GoodOrder.findAndCountAll({
      where: { user_id },
      ...params,
      include: [{
        model: Address,
        as: 'address',
        attributes: { exclude: ['user_id', 'is_default'] }
      }, {
        model: GoodOrderDetail,
        as: 'item',
        attributes: { exclude: ['id', 'order_id'] },
        include: [{
          model: Good,
          as: 'info',
          attributes: { exclude: ['id'] }
        }]
      }],
      attributes: ['id', 'sum_price', 'comment', ['created_at', 'date']]
    });
  }

  /**
   * @param {number} user_id
   * @param {number} address_id
   * @param {number} sum_price
   * @param {array} list [{good_id, count, sum_price}]
   * @returns
   */
  static async addOrder(user_id, address_id, sum_price, list) {
    return await  sequelize.transaction(async t => {
      const order = await GoodOrder.create({
        user_id,
        address_id,
        sum_price
      }, { transaction: t })
      for (let item of list) {
        await GoodOrderDetail.create({
          ...item,
          order_id: order.id,
        }, { transaction: t });
      }
      return order
    })
  }
}

GoodOrder.init({
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
  // 订单总价
  sum_price: Sequelize.INTEGER,
  comment: Sequelize.STRING(200)
}, {
  sequelize,
  tableName: 'good_order'
})

module.exports = {
  GoodOrder
}