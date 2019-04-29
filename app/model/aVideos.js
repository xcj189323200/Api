'use strict';
const BaseModel = require('../core/base_model.js');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AvSchema = new Schema({
    title: { type: String, default: '' }, // 标题
    images: { type: Array, default: '' }, // 图片
    desc: { type: String, default: '' }, // 描述
    download_details: { type: Object, default: '' }, // 下载地址
    status: { type: Number, default: 1 }, // 是否删除
    source: { type: String, default: 1 }, // 来自平台
    create_user: { type: String, default: '' }, // 创建人名字
    create_time: { type: Date }, // 创建时间
    update_time: { type: Date }, // 更新时间
  });

  AvSchema.statics = Object.assign({}, BaseModel);

  return mongoose.model('AVideos', AvSchema, 'AVideos');
};
