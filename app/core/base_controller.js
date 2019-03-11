'use strict';

const { Controller } = require('egg');

class BaseControllers extends Controller {
  get user() {
    return this.ctx.session.user;
  }
  get aa() {
    return '这是aa';
  }

  success(data, msg = '操作成功') {
    this.ctx.body = {
      code: 200,
      data,
      msg,
    };
  }
  deleteFail(msg = '删除失败,暂无数据') {
    this.ctx.throw(500, msg);
    // this.ctx.body = {
    //   code: 501,
    //   data,
    //   msg,
    // };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseControllers;
