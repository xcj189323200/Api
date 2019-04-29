'use strict';

module.exports = (router, { controller }) => {
  router.resources('work', '/work', controller.work);
};
