'use strict';

module.exports = (router, { controller }) => {
  router.resources('video', '/video', controller.video);
};
