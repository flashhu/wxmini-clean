const db = require('../../core/db')

const registerByOpenid = async (openid) => {
  await db.add('cl_users', {
    openid
  });
}

const getUserByOpenid = async (openid) => {
  const user = await db.select('cl_users', ['*'], { openid });
  return user.length ? user[0] : undefined;
}

module.exports = {
  registerByOpenid,
  getUserByOpenid
}