'use strict';

module.exports = (router, { controller }) => {
  router.resources('house', '/house', controller.house);
};
