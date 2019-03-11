'use strict';

const Service = require('egg').Service;
class CategoryService extends Service {
  async get_list() {
    const { ctx } = this;

    const data = await ctx.model.Category.find();
    return data;
  }
  async create_categroy(params) {
    const { ctx } = this;
    const _params = Object.assign(
      {
        create_time: Date.now(),
      },
      params
    );
    const data = await ctx.model.Category.insert(_params);
    console.log(data, 'create');
    return data;
  }
  async update_categroy(id, params) {
    const { ctx } = this;
    const _params = Object.assign(
      {
        create_time: Date.now(),
      },
      params
    );
    const data = await ctx.model.Category.updateInfo({ id }, _params);
    console.log(data, 'create');
    return data;
  }
  async get_count(params = {}) {
    const { ctx } = this;
    const count = await ctx.model.Category.count(params);
    return count;
  }
  async delete(id) {
    const { ctx } = this;
    const data = await ctx.model.Category.findByIdAndRemove(id);
    return data;
  }
}
module.exports = CategoryService;
