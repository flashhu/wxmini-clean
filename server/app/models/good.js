const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')
const { GoodOrderDetail } = require('./good_order_detail')
const { NotFound } = require('../../core/httpException')

class Good extends Model {
  static async getGoods() {
    return await Good.findAll();
  }

  static async getDetail(id) {
    const good = await Good.findByPk(id);
    if (!good) {
      throw new NotFound('商品不存在');
    }
    const details = await GoodOrderDetail.findAll({
      where: { good_id: id }
    });
    const sumInfo = this._getSumInfoFromDetails(details);
    return {
      info: good,
      ...sumInfo
    };
  }

  static _getSumInfoFromDetails(details) {
    let sales = 0;
    let appraise = {
      agree: 0,
      disagree: 0
    }
    for(let item of details) {
      const { count, is_favor } = item;
      sales += count;
      if(is_favor && is_favor === 1) {
        appraise.agree ++;
      }
      if(is_favor && is_favor === 2) {
        appraise.disagree ++;
      }
    }
    return {
      sales,
      appraise
    }
  }
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