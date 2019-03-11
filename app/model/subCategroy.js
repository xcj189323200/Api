'use strict';
const BaseModel = require('../core/base_model.js');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SubCategroySchema = new Schema({
    name: { type: String, default: '' }, // 子分类
    parent_id: { type: String, default: '' }, // 0:一级分类  其他是二级分类
    cover_img: { type: String, default: '' }, // 分类封面图
    status: { type: Number, default: 1 }, // 是否删除 0:删除  1未删除
    sefl_flag: { type: Number, default: 1 }, // 是否上架 0:下架  1上架
    sort_order: { type: Number, default: 0 }, // 排序 值越大 权限越高
    create_user: { type: String, default: '' }, // 创建人名字
    create_time: { type: Number }, // 创建时间
    update_time: { type: Number }, // 更新时间
  });

  SubCategroySchema.statics = Object.assign({}, BaseModel);

  return mongoose.model('SubCategroys', SubCategroySchema, 'SubCategroy');
};
