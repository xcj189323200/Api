'use strict';

const Controller = require('egg').Controller;
const qiniu = require('qiniu');

class HomeController extends Controller {
  async getToken() {
    const { ctx, config } = this;
    const mac = new qiniu.auth.digest.Mac(config.qiniu.AccessKey, config.qiniu.SecretKey);
    const config2 = new qiniu.conf.Config();
    console.log(qiniu.zone, 'qiniu.zone');
    config2.zone = qiniu.zone.Zone_z0;
    // const formUploader = new qiniu.form_up.FormUploader(config2);
    // const putExtra = new qiniu.form_up.PutExtra();
    const options = {
      scope: config.qiniu.Bucket,
      deleteAfterDays: 1,
      returnBody:
    '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    };

    const putPolicy = new qiniu.rs.PutPolicy(options);
    // const bucketManager = new qiniu.rs.BucketManager(mac, null);
    const token = putPolicy.uploadToken(mac);

    ctx.body = {
      code: 200,
      data: {
        token,
      },
    };
  }
}

module.exports = HomeController;
