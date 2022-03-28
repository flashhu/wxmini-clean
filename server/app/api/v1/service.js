const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth');
const { success } = require('../../lib/helper')
const { OrderServiceValidator } = require('../../validators/validator');
const { ServiceOrder } = require('../../models/service_order');

const router = new Router({
    prefix: '/v1/service'
})

/**
 * 获取已下单的服务列表
 */
router.get('/orderList', new Auth().m, async (ctx)=> {
  const res = await ServiceOrder.getOrderList(ctx.auth.uid);
  ctx.body = res;
})

/**
 * 预约服务
 */
router.post('/order', new Auth().m, async (ctx)=> {
  const v = await new OrderServiceValidator().validate(ctx);
  const { address_id, type, point, date, sum_price, ...governParams } = v.get('body');
  const isDetect = ['s', 'c'].includes(type);
  const params = isDetect ? { point } : governParams;
  await ServiceOrder.addOrder(ctx.auth.uid, address_id, {
    type, sum_price, date, ...params
  });
  success('预约成功！');
})

module.exports = router