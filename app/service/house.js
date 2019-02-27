'use strict';

const Service = require('egg').Service;
class HouseService extends Service {
  async getList(params) {
    const { app, ctx } = this;

    const LianjiaHost = 'https://gateway.lianjia.com';
    const url = LianjiaHost + '/wukong/ershoufang/search';
    const { data } = await app.curl(url,
      {
        data: params,
        dataType: 'json',
        headers: {
          authorization: ctx.helper.lianjiaWxSignature({ params, url }),
        },
      }
    );
    return {
      data,
    };
  }
}
module.exports = HouseService;
