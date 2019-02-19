'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const _router = router.namespace('/api');
  _router.get('/', controller.home.index);
  _router.get('/qiniu/getToken', controller.qiniu.getToken);
};
