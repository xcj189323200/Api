'use strict';

module.exports = app => {
  const LianjiaHost = 'https://gateway.lianjia.com';
  const _houseListApiUrl = LianjiaHost + '/wukong/ershoufang/search';
  const _communitysApiUrl = LianjiaHost + '/wukong/xiaoqu/detail';
  return {
    schedule: {
      interval: '1m', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
      let _counts = 0;
      const params = { offset: 0, limit: 30, query: '燕郊', city_id: '131000' };
      // 请求链家房屋列表接口
      await getHouseInfo();
      async function getHouseInfo() {
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
        if (!data.error_code) {
          const { list = {}, total_count } = data.data;
          const _list = Object.values(list);
          params.offset += params.limit;
          for (let i = 0; i < _list.length; i++) {
            Object.assign(_list[i], {
              source_type: '链家',
            });
            const _houseCount = await ctx.model.Houses.counts({
              house_code: _list[i].house_code,
            });
            _counts++;
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
          if (params.offset >= total_count) {
            return;
          }
          await getHouseInfo();
        }
      }

      console.log('获得信息成功条数:', _counts);
    },
  };
};
