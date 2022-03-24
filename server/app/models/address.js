const db = require('../../core/db')

/**
 * 获取地址列表
 * @param {*} uid
 * @returns
 */
const getAddr = async (uid) => {
  const keys = ['id', 'name', 'phone', 'addr', 'is_default'];
  const rows = await db.select('cl_address', keys, { uid }, ['is_default DESC']);
  return rows;
}

/**
 * 增加地址
 * @param {*} params
 */
const addAddr = async (params) => {
  await db.add('cl_address', params);
  const rows = await db.select('cl_address', ['*'], params);
  return rows?.length ? rows[0] : undefined;
}

/**
 * 删除地址
 * @param {*} id
 */
const delAddr = async (id) => {
  await db.del('cl_address', {id});
}

/**
 * 修改地址
 * @param {*} id
 */
const updateAddr = async (params, id) => {
  await db.modify('cl_address', params, {id});
}

module.exports = {
  addAddr,
  getAddr,
  delAddr,
  updateAddr
}