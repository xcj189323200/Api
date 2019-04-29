'use strict';
const BaseModel = require('../core/base_model.js');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const WorkSchema = new Schema({
    work_name: { type: String, default: '' }, // 工作
    work_type: { type: String, default: '' }, // 工作类型
    money: { type: String, default: 0 }, // 钱数
    city: { type: String, default: '' }, // 市
    area: { type: String, default: '' }, // 区
    street: { type: String, default: '' }, // 街道
    status: { type: Number, default: 1 }, // 是否删除
    source: { type: String, default: 1 }, // 来自平台
    create_user: { type: String, default: '' }, // 创建人名字
    create_time: { type: Date }, // 创建时间
    update_time: { type: Date }, // 更新时间
  });

  WorkSchema.statics = Object.assign({}, BaseModel);

  return mongoose.model('Works', WorkSchema, 'Works');
};
