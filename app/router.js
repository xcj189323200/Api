'use strict';
const CommonRoute = require('./routes/common');
const HouseRoute = require('./routes/house');
const CategoryRoute = require('./routes/category');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router } = app;
  const _router = router.namespace('/api');

  CommonRoute(_router, app);
  HouseRoute(_router, app);
  CategoryRoute(_router, app);
};
