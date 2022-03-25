const Router = require('koa-router')
const { success } = require('../../lib/helper')
const { AddCaseValidator } = require('../../validators/validator');
const { Case } = require('../../models/case');

const router = new Router({
    prefix: '/v1/case'
})

/**
 * 新增案例
 */
router.post('/add', async (ctx)=> {
  const v = await new AddCaseValidator().validate(ctx);
  await Case.addCase(v.get('body.name'), v.get('body.img'));
  success('添加案例成功！');
})

router.get('/list', async (ctx)=> {
  const res = await Case.getCases();
  ctx.body = {
    data: res
  };
})

module.exports = router