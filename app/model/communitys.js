'use strict';
const BaseModel = require('../core/base_model.js');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const communitySchema = new Schema({
    name: { type: String, default: '' }, // 小区名字
    alias: { type: String, default: '' }, // 小区别名字
    parking_fee: { type: String, default: '' }, // 停车费
    car_down_count: { type: String, default: '' }, // 车位数
    car_ratio: { type: String, default: '' }, // 车位配比
    source_type: { type: String, default: '' }, // 来源

    developers: { type: Array, default: [] }, // 开发商
    building_types: { type: Array, default: [] }, // 建筑类型
    building_year: { type: Array, default: [] }, // 建造年限
    preview_images: { type: Array, default: [] }, // 预览图
    properties: { type: Array, default: [] }, // 物业公司详情
    tenement_fees: { type: Array, default: [] }, // 物业费用
    view_url: { type: Object, default: {} }, // 预览详情

    building_count: { type: Number, default: 0 }, // 楼栋总数
    price_unit_avg: { type: Number, default: 0 }, // 平均单价
    create_time: { type: Number, default: 0 }, // 创建时间
    update_time: { type: Number, default: 0 }, // 更新时间
    resblock_id: { type: String, default: 0 }, // 小区ID
  });

  communitySchema.statics = Object.assign({}, BaseModel);

  return mongoose.model('Communitys', communitySchema, 'Communitys');
};
