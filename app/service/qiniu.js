'use strict';

const Service = require('egg').Service;
const qiniu = require('qiniu');
const config = new qiniu.conf.Config();
const bucket = 'img-xcj';
const mac = new qiniu.auth.digest.Mac('mgojDrNBW3gjfJaUF26RuLLIHi1mTz50YL8GRrZF', 'rRGS5q8S9gKwdyhPuPhju3ZLTMpa4RXYiTzP6Ulw');
config.zone = qiniu.zone.Zone_z0;
const bucketManager = new qiniu.rs.BucketManager(mac, config);

class QiniuService extends Service {
  async get_token() {
    const options = {
      scope: bucket,
      deleteAfterDays: 1,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    };

    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac);
    return token;
  }
  async fetch_resource(url, key) {
    return new Promise((resolve, reject) => {
      bucketManager.fetch(url, bucket, key, function(err, respBody, respInfo) {
        if (err) {
          console.log(err);
          reject(err);
          // throw err;
        } else {
          if (respInfo.statusCode === 200) {
            const path = 'http://img.crofys.cn/' + key;
            resolve(path);
          } else {
            reject();
          }
        }
      });
    });

  }
}
module.exports = QiniuService;
