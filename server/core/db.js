const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool(global.config.database)
pool.query = util.promisify(pool.query)

module.exports = pool