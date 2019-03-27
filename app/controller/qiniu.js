'use strict';

const Controller = require('egg').Controller;


class QiniuController extends Controller {
  async getToken() {
    const { ctx } = this;

    const token = ctx.service.qiniu.get_token();

    ctx.body = {
      code: 200,
      data: {
        token,
      },
    };
  }

  async index() {
    const { ctx } = this;
    const resUrl = 'https://puui.qpic.cn/vcover_vt_pic/0/3oe086g3e8pvmm11526636789/220';
    const key = '乳品1';

    const path = await ctx.service.qiniu.fetch_resource(resUrl, key);
    ctx.body = {
      code: 200,
      data: path,
    };
  }
}

module.exports = QiniuController;
