'use strict';

const Service = require('egg').Service;
class QiniuService extends Service {
  async getList() {
    const { app } = this;
    const data = await app.$select('users', {});
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    return {
      data,
    };
  }
}
module.exports = QiniuService;
