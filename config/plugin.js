'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  // mysql: {
  //   enable: true,
  //   package: 'egg-mysql',
  // },
};
