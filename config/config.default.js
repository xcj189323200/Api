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
