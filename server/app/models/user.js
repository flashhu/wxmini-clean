const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db')

class User extends Model {
  static async getUserByOpenid(openid) {
    const user = User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    // 观察者模式
    type: Sequelize.STRING,
    set(val) {
      // 生成盐
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}