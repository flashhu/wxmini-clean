const { Success } = require('../../core/httpException')

/**
 * 操作成功
 * @param {*} msg
 * @param {*} ]errorCode
 */
function success(msg, errorCode) {
    throw new Success(msg, errorCode)
}

module.exports = {
    success
}