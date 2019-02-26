'use strict';

const Controller = require('egg').Controller;

class HouseController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.query, '----params');
    const { data } = await ctx.service.house.getList();
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: data.data,
    };
  }
}

module.exports = HouseController;
