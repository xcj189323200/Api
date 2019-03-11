'use strict';
const BaseModel = require('../core/base_model.js');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const HouseSchema = new Schema({
    title: { type: String }, // 标题
    source_type: { type: String }, // 渠道
    building_type: { type: String }, // 房屋形式 ("板塔结合")
    building_year: { type: String }, // 建筑年限
    decoration_type: { type: String }, // 装修程度
    elevator: { type: String }, // 是否有电梯
    floor_level: { type: String }, // 当前楼层
    floor_total: { type: String }, // 总共楼层
    frame_type: { type: String }, // 房屋格局
    house_area: { type: Number }, // 房屋面积
    house_code: { type: String }, // 房屋面积
    house_type: { type: String }, // 房屋类型
    is_remove: { type: Number }, // 是否删除 0:未删除 1:删除
    list_pic_url: { type: String }, // 列表预览图片
    list_price: { type: String }, // 列表价格
    list_time: { type: String }, // 列表时间
    orientation: { type: String }, // 朝向
    reablock_url: { type: Object }, // 小区详情
    resblock_id: { type: String }, // 小区Id
    resblock_name: { type: String }, // 小区名字
    resblock_url_esf: { type: Object }, // 小区其他房源推荐
    subway_info: { type: Array }, // 地铁信息
    tags: { type: Array }, // 标签
    total_price: { type: Number }, // 总价
    unit_price: { type: Number }, // 单价
    create_time: { type: Number }, // 创建时间
    update_time: { type: Number }, // 更新时间
    view_url: { type: Object }, // 详情
  });

  HouseSchema.statics = Object.assign({}, BaseModel);

  return mongoose.model('Houses', HouseSchema, 'Houses');
};
