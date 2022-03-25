const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class Good extends Model {
  static async getGoods() {
    return await Good.findAll();
  }

// /**
//  * 创建订单
//  */
// const createGoodOrder = async (params) => {
//   const currTime = dayjs().format('YYYYMMDDHHmmss');
//   const vals = { ...params, created_at: currTime };
//   await db.add('cl_goods_order', vals);
//   const rows = await db.select('cl_goods_order', ['*'], vals);
//   return rows?.length ? rows[0] : undefined;
// }

}

Good.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING(100),
  unit: Sequelize.STRING(10),
  spec: Sequelize.STRING(100),
  price: Sequelize.STRING(10),
  img_h1: Sequelize.STRING(100),
  img_h2: Sequelize.STRING(100),
  img_bd: Sequelize.STRING(100),
}, {
  sequelize,
  tableName: 'good'
})

module.exports = {
  Good
}