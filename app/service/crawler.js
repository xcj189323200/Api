'use strict';

const Service = require('egg').Service;
const cheerio = require('cheerio');

class CategoryService extends Service {
  async get_boss_work(params) {
    const { ctx } = this;
    const _data = [];
    const { page, url, work_type } = params;

    // const create_data = [];
    // const qqVideoHost = `https://v.qq.com/x/bu/pagesheet/list?_all=1&append=1&channel=movie&listpage=2&offset=${page * 30}&pagesize=30&sort=18`;
    // const Host = 'https://www.zhipin.com/c101030100-p100901/';
    // const Host = 'https://www.zhipin.com/c101030100-p100901/';
    const result = await ctx.curl(url, {
      data: {
        page,
        ka: `page-${page}`,
      },
      headers: {
        'content-type': 'text/html',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
      },
    });

    const $ = cheerio.load(result.data.toString(), { decodeEntities: false });

    $('.job-list .job-primary').each(async (i, e) => {
      const title_nodes = $(e).find('.name a');
      const work_name = title_nodes.find('.job-title').text();
      const money = title_nodes.find('.red').text();
      const _address = $(e)
        .find('.info-primary p')
        .contents()
        .eq(0)
        .text();
      const address = _address.split(' ');
      _data.push({
        work_name,
        work_type,
        money,
        city: address[0],
        area: address[1],
        street: address[2],
        source: 'boss',
      });
    });
    return _data;
  }
  async get_qq_video({ page = 1 }) {
    const { ctx } = this;
    const _data = [];
    // const create_data = [];
    // const qqVideoHost = `https://v.qq.com/x/bu/pagesheet/list?_all=1&append=1&channel=movie&listpage=2&offset=${page * 30}&pagesize=30&sort=18`;
    const qqVideoHost = `https://v.qq.com/channel/movie?listpage=2&offset=${page *
      30}&pagesize=30&channel=movie&sort=18&_all=1`;
    const result = await ctx.curl(qqVideoHost, {
      headers: {
        'content-type': 'text/html',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
      },
    });

    const $ = cheerio.load(result.data.toString(), { decodeEntities: false });

    $('.mod_figure .list_item').each(async (i, e) => {
      const cover_img =
        'http:' +
        $(e)
          .find('.figure_pic')
          .attr('src');
      const video_url = $(e)
        .find(' a')
        .attr('href');
      const title = $(e)
        .find('.figure_detail a')
        .text();
      _data.push({
        cover_img,
        video_url,
        title,
        source: 'qq',
        // cover_img: await ctx.service.qiniu.fetch_resource(data.cover_img, `video/${data.source}/${data.title}`),
        create_time: Date.now(),
        update_time: Date.now(),
      });
    });
    return _data;
  }
  async get_iqiyi_video(page) {
    const { ctx } = this;
    const _data = [];
    const iqiyiVideoHost = `https://list.iqiyi.com/www/1/-------------24-${page}-1---.html`;
    const result = await ctx.curl(iqiyiVideoHost, {
      headers: {
        'content-type': 'text/html',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
      },
    });
    const $ = cheerio.load(result.data.toString(), { decodeEntities: false });

    $('.wrapper-piclist ul li').each(async (i, e) => {
      const cover_img =
        'http:' +
        $(e)
          .find('.site-piclist_pic a img')
          .attr('src');
      const video_url = $(e)
        .find(
          '.site-piclist_info .mod-listTitle_left .site-piclist_info_title a'
        )
        .attr('href');
      const title = $(e)
        .find(
          '.site-piclist_info .mod-listTitle_left .site-piclist_info_title a'
        )
        .text();
      _data.push({
        cover_img,
        video_url,
        title,
        source: 'iqiyi',
      });
    });

    return _data;
  }
  async get_91av_video() {
    const { ctx } = this;
    const _data = [];
    const videoHost = 'http://www.91avfuli.org/jipin';
    const result = await ctx.curl(videoHost, {
      headers: {
        'content-type': 'text/html',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
      },
    });
    const $ = cheerio.load(result.data.toString(), { decodeEntities: false });

    $('#post_container li .thumbnail a').each(async (i, e) => {
      const _url = $(e).attr('href');
      if (_url) {
        const _result = await ctx.curl(_url, {
          headers: {
            Cookie:
              '_ga=GA1.2.1065285231.1549687832; wordpress_test_cookie=WP+Cookie+check; Hm_lvt_7ff06ca44458bafe5f74540dba6ca1eb=1552736834,1554627405; _gid=GA1.2.5975012.1554627408; wordpress_logged_in_5ed08702b85b09ae3f17d2199489c172=xcj189323200%7C1554800300%7CWFTTCWpd9cue9c1Qaq7WiUeHRmQW6KUA9sGcBb481iI%7C0849fa472e341cafd711264bef2f4c56c5d1d1d4c90ff8b425ab7d4c3667ec4d; Hm_lpvt_7ff06ca44458bafe5f74540dba6ca1eb=1554697275',
            'content-type': 'text/html',
            'user-agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
          },
        });
        const _$ = cheerio.load(_result.data.toString(), {
          decodeEntities: false,
        });
        const title = _$('#content h1').text();
        const desc = _$('#post_content p').text();
        const images = [];
        _$('#post_content img').each(async (i, k) => {
          images.push(_$(k).attr('src'));
        });
        const download_details = {
          url: _$('#post_content p')
            .last()
            .prev()
            .find('a')
            .attr('href'),
          code: _$('#post_content p')
            .last()
            .prev()
            .find('span')
            .text(),
          pass: _$('#post_content p')
            .last()
            .prev()
            .last()
            .text(),
        };
        _data.push({
          title,
          images,
          desc,
          download_details,
        });
      }
      console.log(_data);
    });

    return _data;
  }
  async created_videos(data) {
    const { ctx } = this;
    const _data = [];
    let insert_data = [];
    for (let i = 0; i < data.length; i++) {
      const _count = await ctx.model.Videos.counts({
        source: data[i].source,
        title: data[i].title,
        status: 1,
      });
      console.log(_count, '_count');
      if (!_count) {
        _data.push(
          Object.assign(data[i], {
            cover_img: await ctx.service.qiniu.fetch_resource(
              data[i].cover_img,
              `video/${data[i].source}/${data[i].title}`
            ),
            create_time: Date.now(),
            update_time: Date.now(),
          })
        );
      }
    }
    insert_data = await ctx.model.Videos.insertMany(_data);
    console.log(insert_data, 'insert_data');
    return insert_data;
  }
  async created_91av_videos(data) {
    const { ctx } = this;
    const _data = [];
    let insert_data = [];
    for (let i = 0; i < data.length; i++) {
      const _count = await ctx.model.AVideos.counts({
        title: data[i].title,
        status: 1,
      });
      console.log(_count, '_count');
      if (!_count) {
        _data.push(
          Object.assign(data[i], {
            // cover_img: await ctx.service.qiniu.fetch_resource(data[i].cover_img, `video/${data[i].source}/${data[i].title}`),
            create_time: Date.now(),
            update_time: Date.now(),
          })
        );
      }
    }
    insert_data = await ctx.model.AVideos.insertMany(_data);
    console.log(insert_data, 'insert_data');
    return insert_data;
  }

}
module.exports = CategoryService;
