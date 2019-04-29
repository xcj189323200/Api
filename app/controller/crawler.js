'use strict';

const Controller = require('../core/base_controller');

class PublicController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.Rules = {
      get_rules: {
        page: { type: 'string', required: false },
      },
      id_rules: {
        id: { type: 'string', required: true },
      },
    };
  }
  async crawler() {
    const { ctx, params } = this;
    // 验证参数
    ctx.validate(this.Rules.get_rules, params);

    const _data = await ctx.service.crawler.get_iqiyi_video();

    for (let i = 0; i < _data.length; i++) {
      await ctx.service.crawler.created_videos(_data[i]);
    }

    ctx.logger.debug(_data, '_data');
    this.success(_data);
  }
  async get_boss_work() {
    const { ctx, params } = this;
    const { total_pages } = params;
    // 验证参数
    // ctx.validate(this.Rules.get_rules, params);

    const _data = []; // 爬取的所有数据
    let insert_data = []; // 插入的数据

    for (let k = 1; k <= total_pages; k++) {
      _data.push(
        ...(await ctx.service.crawler.get_boss_work({ ...params, page: k }))
      );
    }
    insert_data = await ctx.service.work.created_boss(_data);

    this.success({
      list: insert_data,
      totals: insert_data.length,
    });
  }
  async get_qq_video() {
    const { ctx, params } = this;
    // 验证参数
    ctx.validate(this.Rules.get_rules, params);

    const _data = []; // 爬取的所有数据
    let insert_data = []; // 插入的数据

    // for (let k = 1; k <= 1; k++) {
    _data.push(...(await ctx.service.crawler.get_qq_video(params)));
    // }
    insert_data = await ctx.service.crawler.created_videos(_data);

    ctx.logger.debug(_data, '_data');
    this.success({
      list: insert_data,
      totals: insert_data.length,
    });
  }
  async get_iqiyi_video() {
    const { ctx, params } = this;
    // 验证参数
    ctx.validate(this.Rules.get_rules, params);

    const _data = []; // 爬取的所有数据
    let insert_data = []; // 插入的数据

    _data.push(...(await ctx.service.crawler.get_iqiyi_video(params)));
    insert_data = await ctx.service.crawler.created_videos(_data);

    ctx.logger.debug(_data, '_data');
    this.success({
      list: insert_data,
      totals: insert_data.length,
    });
  }
  async get_91av_video() {
    const { ctx, params } = this;
    // 验证参数
    ctx.validate(this.Rules.get_rules, params);

    const _data = []; // 爬取的所有数据
    let insert_data = []; // 插入的数据

    _data.push(...(await ctx.service.crawler.get_91av_video(params)));
    insert_data = await ctx.service.crawler.created_91av_videos(_data);

    ctx.logger.debug(_data, '_data');
    this.success({
      list: insert_data,
      totals: insert_data.length,
    });
  }
}

module.exports = PublicController;
