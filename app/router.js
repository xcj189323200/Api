'use strict';
const CommonRoute = require('./routes/common');
const CategoryRoute = require('./routes/category');
const VideoRoute = require('./routes/video');
const CrawlerRoute = require('./routes/crawler');
const WorkRoute = require('./routes/work');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router } = app;
  const _router = router.namespace('/api');

  CommonRoute(_router, app);
  CategoryRoute(_router, app);
  VideoRoute(_router, app);
  CrawlerRoute(_router, app);
  WorkRoute(_router, app);
};
