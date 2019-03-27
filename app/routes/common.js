'use strict';

module.exports = (router, { controller }) => {
  router.get('/qiniu/getToken', controller.qiniu.getToken);
  router.get('/crawler', controller.crawler.crawler);
  router.resources('qiniu', '/qiniu', controller.qiniu);
};
