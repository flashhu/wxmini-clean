const Router = require('koa-router')
const { success } = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/user'
})

router.get('/', async (ctx)=> {
    success();
})

/**
 * 用户注册
 */
router.post('/register', async (ctx)=> {
    console.log('register!');
    success()
})

module.exports = router