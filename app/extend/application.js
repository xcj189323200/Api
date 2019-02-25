'use strict';
// app/extend/application.js

const $db = require('../utils/db.js');

module.exports = {
  ...$db,
};
