'use strict';

module.exports = (router, { controller }) => {
  router.resources('category', '/category', controller.category);
};
