// 商品订单明细表
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class GoodOrderDetail extends Model {

}

GoodOrderDetail.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  good_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  count: Sequelize.INTEGER,
  sum_price: Sequelize.INTEGER,
  is_favor: Sequelize.TINYINT(2)
}, {
  sequelize,
  tableName: 'good_order_sp'
})

module.exports = {
  GoodOrderDetail
}