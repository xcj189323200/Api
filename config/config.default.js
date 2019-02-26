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
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '39.96.166.71',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'Aa123456-',
        // 数据库名
        database: 'api',
      },
      // 是否加载到 app 上，默认
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
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
