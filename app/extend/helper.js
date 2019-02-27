'use strict';
const moment = require('moment');
const CryptoJS = require('crypto-js');

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');

exports.lianjiaWxSignature = ({ params, url = '', methods = 'GET' }) => {
  const _url = url.split('?')[0].split('://')[1];
  const _host = _url.split('/')[0];
  const _path = _url.split(_host)[1];
  const _timestamp = parseInt(new Date().getTime() / 1e3);
  const _nonce = String(Math.random());
  let _str = '';

  params &&
    Object.keys(params)
      .sort()
      .forEach(e => {
        _str += e + '=' + params[e] + '&';
      });
  _str = _str.substr(0, _str.length - 1);

  let _signature = [
    'accessKeyId=wukong',
    'nonce=' + _nonce,
    'timestamp=' + _timestamp,
    'method=' + methods,
    'path=' + _path,
    'host=' + _host.split(':')[0].toUpperCase(),
  ];
  _str && methods === 'GET' && _signature.push('query=' + _str);
  _signature = _signature.sort().join('&');
  const signature =
    'LJ-HMAC-SHA256 ' +
    [
      'accessKeyId=wukong',
      'nonce=' + _nonce,
      // 'nonce=' + String(Math.random()),
      'timestamp=' + _timestamp,
      'signature=' +
        CryptoJS.HmacSHA256(_signature, 'lMl0XOUNSExcUYtw').toString(
          CryptoJS.enc.Base64
        ),
    ].join('; ');
  return signature;
};
