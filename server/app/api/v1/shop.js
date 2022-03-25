const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth');
const { Good } = require('../../models/good');
const { PositiveIntegerValidator, BuyGoodsValidator } = require('../../validators/validator');

const router = new Router({
    prefix: '/v1/shop'
})

/**
 * 商品列表
 */
router.get('/goodList', async (ctx)=> {
  const res = await Good.getGoods();
  ctx.body = {
    data: res
  };
})


// router.post('/buy', new Auth().m, async (ctx)=> {
//   const v = await new BuyGoodsValidator().validate(ctx);
//   const { addr_id, sum_price, list } = v.get('body');
//   const order = await createGoodOrder({
//     user_id: ctx.auth.uid,
//     addr_id,
//     sum_price
//   })
//   console.log('order', order);
//   await getGoodDetail(v.get('path.id'));
//   ctx.body = {
//     data: 'ok'
//   };
// })

module.exports = router