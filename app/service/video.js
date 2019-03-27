'use strict';

const Service = require('egg').Service;
class HouseService extends Service {
  async get_list(params = {}) {
    const { ctx } = this;
    const {
      skip = 0,
      limit = 10,
      sort = { update_time: 'desc' },
      conditions = {},
    } = params;

    const data = await ctx.model.Videos.find(conditions)
      .limit(limit)
      .skip(skip)
      .sort(sort);

    ctx.logger.info('查询-视频数据库返回值:', data);

    return data;
  }
  async get_details(params = {}) {
    const { ctx } = this;
    const {
      id,
    } = params;

    const data = await ctx.model.Videos.findById(id);

    ctx.logger.info('查询详情-视频数据库返回值:', data);

    return data;
  }
}
module.exports = HouseService;
