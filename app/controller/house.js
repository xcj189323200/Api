'use strict';

const Controller = require('egg').Controller;

class HouseController extends Controller {
  async index() {
    const { ctx } = this;
    const { page, limit, query = '', city_id } = ctx.query;
    const params = {
      city_id, // 城市
      condition: `${'sf1'}${'bp1ep160'}`,
      query,
      order: '', // 排序
      offset: page * limit, // 多少页
      limit, // 每页条数
    };
    console.log(ctx.query, '----params');
    const data = await ctx.service.house.getList(params);
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data,
    };
  }
}

module.exports = HouseController;
