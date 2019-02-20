'use strict';

module.exports = (router, { controller }) => {
  router.get('/qiniu/getToken', controller.qiniu.getToken);
  router.resources('qiniu', '/qiniu', controller.qiniu);
};
