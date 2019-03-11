'use strict';

const Controller = require('../core/base_controller');
// const { Controller } = require('egg');

const Rules = {
  create_rules: {
    name: { type: 'string', required: true },
    cover_img: { type: 'string', required: false },
    sefl_flag: { type: 'number', required: false },
  },
  id_rules: {
    id: { type: 'string', min: 24, max: 24, required: true },
  },
};

class CategoryController extends Controller {
  async index() {
    const { ctx } = this;
    // const {} = ctx.query;
    // const params = {};
    // console.log(ctx.query, '----params');
    const data = await ctx.service.category.get_list();
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
    const { id } = ctx.request.body;
    console.log(ctx.params, id, '=ctx.request.body');
    ctx.validate(Rules.id_rules, ctx.request.body);
    const data = await ctx.service.category.delete(id);

    data ? this.success({ data }) : this.deleteFail();
  }
  async update() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    console.log(ctx.params, '=====');
    console.log(ctx.request.body, 'ctx.request.body=====');
    // ctx.validate(Rules.id_rules, ctx.request.body);
    const data = await ctx.service.category.update_categroy(id, ctx.request.body);

    data ? this.success({ data }) : this.deleteFail();
  }
}

module.exports = CategoryController;
