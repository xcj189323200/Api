'use strict';

const { Controller } = require('egg');

class BaseControllers extends Controller {
  get params() {
    const { method, request, params, query } = this.ctx;
    const _params = { ...params };
    console.log(query, '---------query');
    switch (method) {
      case 'GET':
        Object.assign(_params, query);
        break;
      default:
        Object.assign(_params, request.body);
        break;
    }
    this.ctx.logger.info('请求参数:', _params);

    return _params;
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
  operatFail(msg = '操作失败') {
    this.ctx.throw(500, msg);
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseControllers;
