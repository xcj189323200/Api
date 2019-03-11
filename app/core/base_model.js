'use strict';


module.exports = {
  fetch(cb, sortType = 'update_time', conditions = {}) {
    return this
      .find(conditions)
      .sort({ [sortType]: 'desc' })
      .exec(cb);
  },
  fetchPage(skip, limit, cb, sortType = 'update_time', conditions = {}) {
    return this
      .find(conditions)
      .limit(limit)
      .skip(skip)
      .sort({ [sortType]: 'desc' })
      .exec(cb);
  },
  findById(id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb);
  },
  counts(conditions, cb) {
    return this
      .count(conditions)
      // .countDocuments(conditions)
      .exec(cb);
  },
  findByMulId(ids, cb) {
    return this
      .find({ _id: { $in: ids } })
      .exec(cb);
  },
  findInfo(conditions, cb) {
    return this
      .find(conditions)
      .exec(cb);
  },
  insert(doc, cb) {
    return this
      .create(doc, cb);
  },
  updateInfo(conditions, doc, cb) {
    const options = {};
    const update = { $set: doc };
    return this
      .update(conditions, update, options, cb);
  },
  deleteById(id, cb) {
    console.log(id, '-+++');
    const conditions = { _id: id };
    return this
      .deleteOne(conditions, cb);
  },
};
