'use strict';

const Service = require('egg').Service;
class CategoryService extends Service {
  async get_list(params) {
    const { ctx } = this;
    const {
      skip = 0,
      limit = 2,
      sort = { order: 'desc', update_time: 'desc' },
      conditions = {},
    } = params;

    const data = await ctx.model.Category.find(conditions)
      .limit(limit)
      .skip(skip)
      .sort(sort);

    ctx.logger.info('查询-分类数据库返回值:', data);
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
    ctx.logger.info('创建-分类数据库返回值:', data);

    return data;
  }
  async update_categroy(params) {
    const { ctx } = this;
    const _params = Object.assign(
      {
        update_time: Date.now(),
      },
      params
    );
    const { id } = _params;
    const data = await ctx.model.Category.findByIdAndUpdate(id, _params);
    ctx.logger.info('更新-分类数据库返回值:', data);

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
    ctx.logger.info('删除-分类数据库返回值:', data);

    return data;
  }
}
module.exports = CategoryService;
