/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1550457773022_9542',
    middleware: [ 'errors' ],
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      domainWhiteList: [ '*' ],
    },
    mongoose: {
      url: 'mongodb://39.96.166.71:27017/api',
      options: {
        user: 'xuchangjian',
        pass: 'xuchangjian1994',
        auth: { authMechanism: 'SCRAM-SHA-1' },
      },
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    qiniu: {
      AccessKey: 'mgojDrNBW3gjfJaUF26RuLLIHi1mTz50YL8GRrZF',
      SecretKey: 'rRGS5q8S9gKwdyhPuPhju3ZLTMpa4RXYiTzP6Ulw',
      Bucket: 'img-xcj',
    },
    lianjia: {
      Authorization: 'MjAxNzAzMjRfYW5kcm9pZDo0NTEzNGQ1NmRkMTE0NDA4MTNhZGM4MTAzMGMzYzY3MWJlZjllMjQ3',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
