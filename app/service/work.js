'use strict';

const Service = require('egg').Service;
class WorkService extends Service {
  async get_list(params = {}) {
    const { ctx } = this;
    const {
      skip = 0,
      limit = 10,
      sort = { update_time: 'desc' },
      conditions = {},
    } = params;
    console.log(JSON.parse(params.conditions), '====params');
    const data = await ctx.model.Works.find(JSON.parse(conditions))
      .limit(Number(limit))
      .skip(Number(skip))
      .sort(sort);

    // ctx.logger.info('查询-视频数据库返回值:', data);

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
  async created_boss(data) {
    const { ctx } = this;
    const _data = [];
    const _now = Date.now();
    let insert_data = [];
    for (let i = 0; i < data.length; i++) {
      const _count = await ctx.model.Works.counts({
        source: data[i].source,
        work_name: data[i].work_name,
        work_type: data[i].work_type,
      });
      // console.log(_count, '-------');
      if (!_count) {
        _data.push(
          Object.assign(data[i], {
            create_time: _now,
            update_time: _now,
          })
        );
      }
    }
    insert_data = await ctx.model.Works.insertMany(_data);
    console.log(insert_data, 'insert_data');
    return insert_data;
  }
}
module.exports = WorkService;
