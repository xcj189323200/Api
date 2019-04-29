'use strict';

const Controller = require('../core/base_controller');

const Rules = {
  id_rules: {
    id: { type: 'string', required: true },
  },
};
class HouseController extends Controller {
  /**
   * @title 获得列表
   * @param {Number} skip 跳过的页数
   * @param {Number} limit 每页限制
   * @param {Object} sort 排序
   * @param {Object} conditions 搜索条件
   */
  async index() {
    const { ctx, params } = this;
    const data = await ctx.service.work.get_list(params);
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
