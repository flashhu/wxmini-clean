const db = require('../../core/db')

/**
 * 增加案例
 * @param {*} params
 */
const addCase = async (params) => {
  await db.add('cl_cases', params);
}

/**
 * 获取案例列表
 */
const getCases = async () => {
  const rows = await db.select('cl_cases');
  return rows;
}

module.exports = {
  addCase,
  getCases
}