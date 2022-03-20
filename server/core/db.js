const mysql = require('mysql');
const pool = mysql.createPool(global.config.database);

/**
 * json转为键值对数组
 * @param {object} obj json对象
 * @param {Array} keys 键值
 * @param {Array} values 值
 * @param {Array} param 键值对 等号连接
 */
var prepareParm = (obj, keys, values, param) => {
  for (let key in obj) {
    let val = obj[key];
    keys.push(key)
    if (typeof (val) === 'string') {
      values.push(`'${val}'`);
      param.push(`${key}='${val}'`);
    } else if (val instanceof Array) {
      values.push(`'${val.join('|')}'`);
      param.push(`${key}='${val}'`);
    } else {
      values.push(`${val}`);
      param.push(`${key}=${val}`);
    }
  }
}

const getConn = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        console.log('get connection fail', err);
        reject(err);
      } else {
        resolve(conn);
      }
    })
  })
}

/**
 * 通用查询语句
 * @param {string} sql 查询语句
 */
var querySQL = async (sql) => {
  const conn = await getConn();
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, rows) => {
      if (err) {
        console.log('query fail', sql, err);
        reject(err);
      } else {
        // console.log('get row', rows)
        resolve(rows);
      }
      conn.release();
    })
  })
};

/**
 * 查询语句
 * @param {string} table 表名
 * @param {array} keys 键 ['a', 'b']
 * @param {string} where 完整where语句
 * @param {string} order 完整order语句
 * @param {string} limit 完整limit语句
 */
var select = async (table, keys = ['*'], where = '', order = '', limit = '') => {
  const sql = `select ${keys.join(',')} from ${table} ${where} ${order} ${limit}`;
  return querySQL(sql);
};

/**
 * 删除语句
 * @param {string} table 表名
 * @param {object} where json
 */
var del = async (table, where) => {
  let whereSql = [];
  prepareParm(where, [], [], whereSql);
  whereSql = whereSql.join(' and ');
  const sql = `delete from ${table} where ${whereSql}`;
  return querySQL(sql);
};

/**
 * 插入语句
 * @param {string} table 表名
 * @param {object} params json
 */
var add = async (table, params) => {
  let fieldList = []
  let valList = []
  prepareParm(params, fieldList, valList, [])
  const sql = `insert into ${table} (${fieldList.join(',')}) values(${valList.join(',')})`;
  return querySQL(sql);
};

/**
 * 修改语句
 * @param {string} table 表名
 * @param {object} params json
 * @param {object} where json
 */
var modify = async (table, params, where) => {
  let setSql = [];
  let whereSql = [];
  prepareParm(params, [], [], setSql);
  prepareParm(where, [], [], whereSql);
  const sql = `update ${table} set ${setSql.join(',')} where ${whereSql.join(' and ')}`;
  return querySQL(sql);
};

exports.querySQL = querySQL;
exports.select = select;
exports.add = add;
exports.del = del;
exports.modify = modify;