'use strict';
const _ = require('lodash');
// app/extend/helper.js
module.exports = {
  /**
   * @description 创建数据
   * @date 2019-02-20
   * @param {String} table 要插入的表
   * @param {Object} param 要创建的参数
   */
  async $create(table, param) {
    console.log(this.app, 'this.app');
    const res = await this.app.mysql.insert(table, param);
    return new Promise((reslove, reject) => {
      // 插入成功
      if (res.affectedRows === 1) {
        reslove();
      } else {
        reject();
      }
    });
  },
  /**
   * @description 创建数据
   * @date 2019-02-20
   * @param {String} table 要查询的表
   * @param {Object} where  WHERE 条件
   * @param {Array} columns  要查询的表字段
   * @param {Array} orders  要查询的表字段
   * @param {Number} limit  返回数据量
   * @param {Number} offset  数据偏移量
   * @example this.helper.$select('user',{id:1},{where: { status: 'draft', author: [ 'author1', 'author2' ]},columns: [ 'author', 'title' ], orders: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],limit: 10,offset: 0,})
   */
  async $select(table, { where, columns, orders, limit, offset }) {
    const _conf = this.$filterParams({ where, columns, orders, limit, offset });
    let res;
    if (this.$isTempObject(_conf)) {
      res = await this.app.mysql.select(table);
    } else {
      res = await this.app.mysql.select(table, _conf);
    }
    return new Promise((reslove, reject) => {
      // 成功
      if (res.affectedRows === 1) {
        reslove();
      } else {
        reject();
      }
    });
  },
  /**
   * @description 创建数据
   * @date 2019-02-20
   * @param {String} table 要查询的表
   * @param {Number} id  查询的Id
   */
  async $findById(table, id) {
    const res = await this.$select(table, { where: { id } });
    return new Promise((reslove, reject) => {
      // 成功
      if (res.affectedRows === 1) {
        reslove();
      } else {
        reject();
      }
    });
  },
  /**
   * @description 更新数据
   * @date 2019-02-20
   * @param {String} table 要查询的表
   * @param {Object} params  删除的条件 (如果 其中包含id 则会直接更新)
   * @param {Object} opt  删除的条件 (如果 params 不包含id 则需要传opt 更新)
   * @example this.helper.$delete('user',{id=1})
   */
  async $update(table, params, opt) {
    const _params = this.$filterParams(params);
    let res;
    if (this.$isTempObject(opt)) {
      res = await this.app.mysql.update(table, _params);
    } else {
      res = await this.app.mysql.update(table, _params, {
        where: opt,
      });
    }
    return new Promise((reslove, reject) => {
      // 成功
      if (res.affectedRows === 1) {
        reslove();
      } else {
        reject();
      }
    });
  },
  /**
   * @description 删除数据
   * @date 2019-02-20
   * @param {String} table 要查询的表
   * @param {Object} params  删除的条件
   * @example this.helper.$delete('user',{id=1})
   */
  async $delete(table, params) {
    const res = await this.app.mysql.delete(table, params);
    return new Promise((reslove, reject) => {
      // 成功
      if (res.affectedRows === 1) {
        reslove();
      } else {
        reject();
      }
    });
  },
  /**
   * @description 过滤对象值是空的键
   * @date 2019-02-20
   * @param {Object} obj 需要处理的对象
   * @return {Object} 返回新的对象
   */
  $filterParams(obj) {
    const _obj = { ...obj };
    for (const k in _obj) {
      if (_.isUndefined(_obj[k]) || _.isNull(_obj[k])) {
        delete _obj[k];
      }
    }
    return _obj;
  },
  /**
   * @description 判断是否是空对象
   * @date 2019-02-20
   * @param {Object} obj 需要处理的对象
   * @return {Blooen} true 是空对象 false 不是空对象
   */
  $isTempObject(obj) {
    return !Object.keys(obj).length;
  },
};
