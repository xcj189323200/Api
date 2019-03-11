'use strict';

const Service = require('egg').Service;
class HouseService extends Service {
  async getList() {
    const { app, ctx } = this;
    const _beginTime = Date.now();
    const params = { offset: 0, limit: 30, query: '燕郊', city_id: '131000' };
    await getHouseInfo();
    async function getHouseInfo() {
      const LianjiaHost = 'https://gateway.lianjia.com';
      const _houseListApiUrl = LianjiaHost + '/wukong/ershoufang/search';
      const _communitysApiUrl = LianjiaHost + '/wukong/xiaoqu/detail';
      // 请求链家房屋列表接口
      const { data } = await app.curl(_houseListApiUrl, {
        data: params,
        dataType: 'json',
        timeout: 10000,
        headers: {
          authorization: ctx.helper.lianjiaWxSignature({
            params,
            url: _houseListApiUrl,
          }),
        },
      });
      params.offset += params.limit;
      console.log(data.error_code, 'data.error_code');
      if (!data.error_code) {
        const { list = {}, total_count } = data.data;
        const _list = Object.values(list);
        for (let i = 0; i < _list.length; i++) {
          Object.assign(_list[i], {
            source_type: '链家',
          });
          const _houseCount = await ctx.model.Houses.counts({
            house_code: _list[i].house_code,
          });
          if (!_houseCount) {
            _list[i].create_time = Date.now();
            _list[i].update_time = Date.now();
            await ctx.model.Houses.insert(_list[i]);
          } else {
            _list[i].update_time = Date.now();
            await ctx.model.Houses.updateInfo(
              { house_code: _list[i].house_code },
              _list[i]
            );
          }
          const _communitysCount = await ctx.model.Communitys.counts({
            resblock_id: _list[i].resblock_id,
          });
          if (!_communitysCount) {
            // 请求链家房屋小区接口
            const { data } = await app.curl(_communitysApiUrl, {
              data: { resblock_code: _list[i].resblock_id },
              dataType: 'json',
              timeout: 10000,
              headers: {
                authorization: ctx.helper.lianjiaWxSignature({
                  params: { resblock_code: _list[i].resblock_id },
                  url: _communitysApiUrl,
                }),
              },
            });
            if (!data.error_code) {
              const { info, image } = data.data;
              Object.assign(info, {
                source_type: '链家',
                create_time: Date.now(),
                update_time: Date.now(),
                resblock_id: info.id,
                preview_images: image.images,
              });
              await ctx.model.Communitys.insert(info);
            }
          }
        }
        console.log(params.offset, total_count, '-----');
        if (params.offset >= total_count) {
          return;
        }
        await getHouseInfo();
      }
    }

    const _endTime = Date.now();
    console.log('用时:', _endTime - _beginTime);
    // return data;
    return _endTime - _beginTime;
  }
}
module.exports = HouseService;
