'use strict';

const Controller = require('egg').Controller;
const qiniu = require('qiniu');

class QiniuController extends Controller {
  async getToken() {
    const { ctx, config } = this;
    const mac = new qiniu.auth.digest.Mac(config.qiniu.AccessKey, config.qiniu.SecretKey);
    const config2 = new qiniu.conf.Config();
    config2.zone = qiniu.zone.Zone_z0;
    const options = {
      scope: config.qiniu.Bucket,
      deleteAfterDays: 1,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    };

    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac);

    ctx.body = {
      code: 200,
      data: {
        token,
      },
    };
  }

  async index() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      data: ctx.helper.$select('aa', { where: { id: 3 } }),
    };
  }
}

module.exports = QiniuController;
