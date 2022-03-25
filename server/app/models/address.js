const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class Address extends Model {
  static async getAddr(user_id) {
    return await Address.findAll({
      where: { user_id },
      attributes: { exclude: ['user_id'] },
      order: [['is_default', 'DESC']]
    });
  }

  static async getDefaultAddr(user_id) {
    return await Address.findOne({
      where: {
        user_id: user_id,
        is_default: 1
      }
    });
  }

  /**
   * @param {object} params {user_id, name, phone, addr, is_default}
   * @returns
   */
  static async addAddr(params) {
    const addr = await this.getDefaultAddr(params?.user_id);
    if(params.is_default && addr) {
      // 该用户已存在默认地址
      return await sequelize.transaction(async t => {
        await addr.update({
          is_default: 0
        }, { transaction: t });
        return Address.create(params, { transaction: t });
      })
    } else {
      return await Address.create(params);
    }
  }

  /**
   * @param {*} params {name, phone, addr, is_default}
   * @param {*} id
   * @param {*} user_id
   * @returns
   */
  static async updateAddr(params, id, user_id) {
    const addr = await this.getDefaultAddr(user_id);
    if (params.is_default && addr) {
      // 该用户已存在默认地址
      return await sequelize.transaction(async t => {
        await addr.update({
          is_default: 0
        }, { transaction: t });
        return Address.update(params, { where: { id }, transaction: t });
      })
    }
    return await Address.update(params, { where: { id } });
  }

  static async delAddr(id) {
    return await Address.destroy({
      where: { id },
      // force: false 软删除，插入时间戳标记
      // force: true  物理删除
      force: false,
    });
  }
}

Address.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: Sequelize.INTEGER,
  name: Sequelize.STRING(50),
  phone: Sequelize.STRING(15),
  addr: Sequelize.STRING(50),
  is_default: Sequelize.BOOLEAN
}, {
  sequelize,
  tableName: 'address'
})

module.exports = {
  Address
}