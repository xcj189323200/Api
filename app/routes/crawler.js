'use strict';

module.exports = (router, { controller }) => {
  router.get('/crawler/videos/qq', controller.crawler.get_qq_video);
  router.get('/crawler/videos/iqiyi', controller.crawler.get_iqiyi_video);
  router.get('/crawler/videos/91av', controller.crawler.get_91av_video);

  router.post('/crawler/work/getBoss', controller.crawler.get_boss_work);
};
