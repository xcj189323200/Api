'use strict';

const Controller = require('../core/base_controller');

const Rules = {
  id_rules: {
    id: { type: 'string', required: true },
  },
};
class HouseController extends Controller {
  async index() {
    const { ctx, params } = this;

    const data = await ctx.service.video.get_list(params);
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data,
    };
  }
  async show() {
    const { ctx, params } = this;
    console.log(params, 'params');
    ctx.validate(Object.assign(Rules.id_rules), params);

    const data = await ctx.service.video.get_details(params);

    ctx.body = {
      code: 200,
      msg: '请求成功',
      data,
    };
  }
}

module.exports = HouseController;
