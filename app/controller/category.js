'use strict';

const Controller = require('../core/base_controller');
// const { Controller } = require('egg');

const Rules = {
  get_rules: {
    skip: { type: 'number', required: false },
    limit: { type: 'number', required: false },
    sort: { type: 'object', required: false },
    conditions: { type: 'object', required: false },
  },
  create_rules: {
    name: { type: 'string', required: true },
    cover_img: { type: 'string', required: false },
    sefl_flag: { type: 'number', required: false },
  },
  id_rules: {
    id: { type: 'string', required: true },
  },
  update_rules: {
    name: { type: 'string', required: false },
    parent_id: { type: 'string', required: false },
    cover_img: { type: 'string', required: false },
    sefl_flag: { type: 'number', required: false },
    sort_order: { type: 'number', required: false },
  },
};

class CategoryController extends Controller {
  async index() {
    const { ctx, params } = this;
    console.log(params, '----params');

    ctx.validate(Rules.get_rules, params);

    const data = await ctx.service.category.get_list(params);
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data,
    };
  }
  async create() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    console.log(ctx.request.body, '=ctx.request.body');

    ctx.validate(Rules.create_rules, ctx.request.body);

    const _count = await ctx.service.category.get_count({ name });

    if (_count) {
      ctx.throw(422, '分类名已存在');
    }
    const data = await ctx.service.category.create_categroy(ctx.request.body);

    this.ctx.body = {
      code: 200,
      msg: '请求成功',
      data,
    };
  }
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;

    ctx.validate(Rules.id_rules, ctx.params);

    const data = await ctx.service.category.delete(id);

    data ? this.success(data) : this.operatFail('删除失败');
  }
  async update() {
    const { ctx, params } = this;
    // const { id } = params;
    // 验证参数
    ctx.validate(Object.assign(Rules.update_rules, Rules.id_rules), params);
    // 更新数据 service
    const data = await ctx.service.category.update_categroy(params);
    // 返回结果
    data ? this.success(data) : this.operatFail('更新失败');
  }
}

module.exports = CategoryController;
