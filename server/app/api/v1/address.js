const Router = require('koa-router')
const { success } = require('../../lib/helper')
const { Auth } = require('../../../middlewares/auth')
const { Address } = require('../../models/address');
const { AddAddrValidator, PositiveIntegerValidator, UpdateAddrValidator } = require('../../validators/validator')

const router = new Router({
    prefix: '/v1/address'
})

router.get('/list', new Auth().m, async (ctx)=> {
  const data = await Address.getAddr(ctx.auth.uid)
  ctx.body = { data };
})

router.post('/add', new Auth().m, async (ctx)=> {
    const v = await new AddAddrValidator().validate(ctx);
    const data = await Address.addAddr({
      user_id: ctx.auth.uid,
      name: v.get('body.name'),
      phone: v.get('body.phone'),
      addr: v.get('body.addr'),
      is_default: Number(v.get('body.is_default'))
    })
    // 返回 address_id
    ctx.body = { data };
})

router.post('/del', new Auth().m, async (ctx)=> {
  const v = await new PositiveIntegerValidator().validate(ctx);
  await Address.delAddr(v.get('body.id'));
  success();
})

router.post('/update', new Auth().m, async (ctx)=> {
  const v = await new UpdateAddrValidator().validate(ctx);
  const {id, ...params} = v.get('body');
  if (params.is_default !== undefined) {
    params.is_default = Number(params.is_default);
  }
  await Address.updateAddr(params, v.get('body.id'), ctx.auth.uid);
  success();
})

module.exports = router