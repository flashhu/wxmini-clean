const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth');
const { Good } = require('../../models/good');
const { GoodOrder } = require('../../models/good_order');
const { success } = require('../../lib/helper')
const { BuyGoodsValidator, CommentGoodsValidator, PositiveIntegerValidator } = require('../../validators/validator');

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

/**
 * 商品详情
 */
router.get('/goodDetail/:id', async (ctx)=> {
  const v = await new PositiveIntegerValidator().validate(ctx);
  // 商品详情、销量、点赞/踩数据
  const info = await Good.getDetail(v.get('path.id'));
  const comments = await GoodOrder.getCommentForGood(v.get('path.id'));
  ctx.body = {
    ...info,
    comments
  };
})

/**
 * 历史购物
 */
router.get('/orderList', new Auth().m, async (ctx)=> {
  const res = await GoodOrder.getOrderList(ctx.auth.uid);
  ctx.body = res;
})

router.post('/buy', new Auth().m, async (ctx)=> {
  const v = await new BuyGoodsValidator().validate(ctx);
  const { address_id, sum_price, list } = v.get('body');
  await GoodOrder.addOrder(ctx.auth.uid, address_id, sum_price, list);
  success();
})

router.post('/comment', new Auth().m, async (ctx)=> {
  const v = await new CommentGoodsValidator().validate(ctx);
  const { order_id, comment, list } = v.get('body');
  await GoodOrder.commentOrder(order_id, comment, list);
  success();
})

module.exports = router