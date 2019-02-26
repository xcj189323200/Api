'use strict';

const Service = require('egg').Service;
class HouseService extends Service {
  async getList() {
    const { app, config } = this;
    const { data } = await app.curl(
      'https://app.api.lianjia.com/house/ershoufang/searchv4?priceRequest=&sugQueryStr=&has_recommend=1&isFromMap=false&houseHotTagsRequest=&condition=&limit_offset=0&communityRequset=&is_history=0&is_suggestion=0&moreRequest=&shequIdRequest=&areaRequest=&roomRequest=&schoolRequest=&comunityIdRequest=&limit_count=20&ad_recommend=1&city_id=131000',
      {
        dataType: 'json',
        headers: {
          Authorization: config.lianjia.Authorization,
        },
      }
    );
    return {
      data,
    };
  }
}
module.exports = HouseService;
