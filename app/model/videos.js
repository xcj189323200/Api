'use strict';
const BaseModel = require('../core/base_model.js');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const VideosSchema = new Schema({
    title: { type: String, default: '' }, // 子分类
    video_url: { type: String, default: 0 }, // 视频路径
    cover_img: { type: String, default: '' }, // 分类封面图
    status: { type: String, default: 1 }, // 来自平台
    source: { type: String, default: 1 }, // 是否上架 0:下架  1上架
    create_user: { type: String, default: '' }, // 创建人名字
    create_time: { type: Date }, // 创建时间
    update_time: { type: Date }, // 更新时间
  });

  VideosSchema.statics = Object.assign({}, BaseModel);

  return mongoose.model('Videos', VideosSchema, 'Videos');
};
