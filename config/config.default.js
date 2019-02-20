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
    middleware: [],
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      domainWhiteList: [ '*' ],
    },
    myql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'mysql.com',
        // 端口号
        port: '3306',
        // 用户名
        user: 'test_user',
        // 密码
        password: 'root',
        // 数据库名
        database: 'xuchangjian',
      },
      // 是否加载到 app 上，默认开启
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
  };

  return {
    ...config,
    ...userConfig,
  };
};
