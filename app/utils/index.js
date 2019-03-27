'use strict';

const qiniu = require('qiniu');
const config = new qiniu.conf.Config();
const bucket = 'img-xcj';
const mac = new qiniu.auth.digest.Mac('mgojDrNBW3gjfJaUF26RuLLIHi1mTz50YL8GRrZF', 'rRGS5q8S9gKwdyhPuPhju3ZLTMpa4RXYiTzP6Ulw');
config.zone = qiniu.zone.Zone_z0;
const bucketManager = new qiniu.rs.BucketManager(mac, config);

module.exports = {
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
  },
};
