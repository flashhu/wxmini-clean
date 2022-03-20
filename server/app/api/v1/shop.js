const Router = require('koa-router')
const { getGoods, getGoodDetail } = require('../../models/goods');
const { PositiveIntegerValidator } = require('../../validators/validator');

const router = new Router({
    prefix: '/v1/shop'
})

/**
 * 商品列表
 */
router.get('/goodList', async (ctx)=> {
  const res = await getGoods();
  ctx.body = {
    data: res
  };
})

/**
 * 商品详情
 */
router.get('/goodDetail/:id', async (ctx)=> {
  const v = await new PositiveIntegerValidator().validate(ctx);
  await getGoodDetail(v.get('path.id'));
  ctx.body = {
    data: 'ok'
  };
})

module.exports = router