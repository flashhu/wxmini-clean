// 绑定关联类型，设外键

// 导入模型，建立模型关系
const { User } = require('../app/models/user')
const { Address } = require('../app/models/address')
const { Good } = require('../app/models/good')
const { GoodOrder } = require('../app/models/good_order')
const { GoodOrderDetail } = require('../app/models/good_order_detail')

// user <-1--n-> address
User.hasMany(Address, {
  foreignKey: 'user_id',
  allowNull: false
});
Address.belongsTo(User, {
  foreignKey: 'user_id',
  allowNull: false
});

// 减少多次聚合的开销
// user <-1--n-> good order
User.hasMany(GoodOrder, {
  foreignKey: 'user_id',
  allowNull: false
});
GoodOrder.belongsTo(User, {
  as: 'u',
  foreignKey: 'user_id',
  allowNull: false
});

// address <-1--n-> good order
Address.hasMany(GoodOrder, {
  foreignKey: 'address_id',
  allowNull: false
});
GoodOrder.belongsTo(Address, {
  as: 'address',
  foreignKey: 'address_id',
  allowNull: false
});

// good order <-1--n-> good order detail
GoodOrder.hasMany(GoodOrderDetail, {
  as: 'item',
  foreignKey: 'order_id',
  allowNull: false
});
GoodOrderDetail.belongsTo(GoodOrder, {
  as: 'o',
  foreignKey: 'order_id',
  allowNull: false
});

// good <-1--n-> good order detail
Good.hasMany(GoodOrderDetail, {
  foreignKey: 'good_id',
  allowNull: false
});
GoodOrderDetail.belongsTo(Good, {
  as: 'info',
  foreignKey: 'good_id',
  allowNull: false
});