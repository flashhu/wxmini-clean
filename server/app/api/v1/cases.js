const Router = require('koa-router')
const { success } = require('../../lib/helper')
const { AddCaseValidator } = require('../../validators/validator');
const { addCase, getCases } = require('../../models/cases');

const router = new Router({
    prefix: '/v1/case'
})

/**
 * 新增案例
 */
router.post('/add', async (ctx)=> {
  const v = await new AddCaseValidator().validate(ctx);
  await addCase({
    name: v.get('body.name'),
    img: v.get('body.img')
  });
  success('添加案例成功！');
})

router.get('/list', async (ctx)=> {
  const res = await getCases();
  ctx.body = {
    data: res
  };
})

module.exports = router