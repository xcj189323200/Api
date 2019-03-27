'use strict';

const Service = require('egg').Service;
const cheerio = require('cheerio');

class CategoryService extends Service {
  // constructor(ctx) {
  //   super(ctx);
  // }
  async get_qq_video() {
    const { ctx } = this;
    const qqVideoHost = 'https://v.qq.com/channel/movie?listpage=1&channel=movie&sort=18&_all=1';
    const result = await ctx.curl(
      qqVideoHost,
      {
        // dataType: 'text',
        headers: {
          'content-type': 'text/html',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
        },
      }
    );

    const $ = cheerio.load(result.data.toString(), { decodeEntities: false });
    const _data = [];
    let cover_img = '';
    let title = '';
    let video_url = '';
    $('.mod_figure .list_item').each(async (i, e) => {
      cover_img = 'http:' + $(e).find('.figure_pic').attr('src');
      video_url = $(e).find(' a').attr('href');
      title = $(e).find('.figure_detail a').text();

      _data.push({ cover_img, video_url, title, source: 'qq' });
    });

    return _data;
  }
  async get_iqiyi_video(page) {
    const { ctx } = this;
    const iqiyiVideoHost = `https://list.iqiyi.com/www/1/-------------24-${page}-1---.html`;
    const result = await ctx.curl(
      iqiyiVideoHost,
      {
        // dataType: 'text',
        headers: {
          'content-type': 'text/html',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
        },
      }
    );
    const $ = cheerio.load(result.data.toString(), { decodeEntities: false });
    const _data = [];
    let cover_img = '';
    let title = '';
    let video_url = '';

    $('.wrapper-piclist ul li').each(async (i, e) => {
      cover_img = 'http:' + $(e).find('.site-piclist_pic a img')
        .attr('src');
      video_url = $(e).find('.site-piclist_info .mod-listTitle_left .site-piclist_info_title a')
        .attr('href');
      title = $(e).find('.site-piclist_info .mod-listTitle_left .site-piclist_info_title a')
        .text();
      _data.push({ cover_img, video_url, title, source: 'iqiyi' });
    });

    return _data;
  }

}
module.exports = CategoryService;
