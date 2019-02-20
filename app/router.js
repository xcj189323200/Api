'use strict';
const CommonRoute = require('./routes/common');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router } = app;
  const _router = router.namespace('/api');

  CommonRoute(_router, app);
  // _router.resources('qiniu', '/getToken', controller.qiniu);
};
