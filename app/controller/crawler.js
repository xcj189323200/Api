'use strict';

const Controller = require('../core/base_controller');

class PublicController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.apiHost = '';
  }
  async crawler() {
    const { ctx } = this;

    const qq_ata = await ctx.service.crawler.get_qq_video();
    const iqiyi_data = [];
    for (let i = 1; i <= 30; i++) {
      (i => {
        setTimeout(async () => {
          console.log(i, '-----');
          iqiyi_data.push(...await ctx.service.crawler.get_iqiyi_video(i));
        }, 2000);
      })(i);
    }
    const _data = [ ...qq_ata, ...iqiyi_data ];

    for (let i = 0; i < _data.length; i++) {
      const _count = await ctx.model.Videos.counts({
        source: _data[i].source,
        title: _data[i].title,
      });
      if (!_count) {
        _data[i].cover_img = await ctx.service.qiniu.fetch_resource(_data[i].cover_img, `video/${_data[i].source}/${_data[i].title}`);
        _data[i].create_time = Date.now();
        _data[i].update_time = Date.now();
        await ctx.model.Videos.insert(_data[i]);
      }
    }

    ctx.logger.debug(_data, '_data');
    this.success(_data);
  }
}

module.exports = PublicController;
