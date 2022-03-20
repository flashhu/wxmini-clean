const db = require('../../core/db')

/**
 * 获取商品列表
 */
const getGoods = async () => {
  const rows = await db.select('cl_goods');
  return rows;
}

/**
 * 获取商品详情
 */
const getGoodDetail = async (id) => {
  const rows = await db.select('cl_goods', ['*'], `id = ${id}`);
  console.log(rows);
}

module.exports = {
  getGoods,
  getGoodDetail
}