'use strict';
const BaseModel = require('./base-model.js');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    userName: { type: String },
    password: { type: String },
  });

  UserSchema.statics = Object.assign({}, BaseModel);

  return mongoose.model('Users', UserSchema, 'Users');
};
