'use strict';

var npmlog = require('npmlog');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var npmlog__default = /*#__PURE__*/_interopDefaultLegacy(npmlog);

npmlog__default['default'].level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
npmlog__default['default'].heading = 'wechat'; // 自定义头部

npmlog__default['default'].addLevel('success', 2000, {
  fg: 'green',
  bold: true
}); // 自定义success日志

npmlog__default['default'].addLevel('notice', 2000, {
  fg: 'blue',
  bg: 'black'
}); // 自定义notice日志

var log_1 = npmlog__default['default'];

require('request');

function initMixin(offiaccount) {
  offiaccount.prototype._init = function (options = {}) {
    this.opt = options;
    log_1.info(JSON.stringify(options));
  };

  offiaccount.prototype.initAccessToken = async function (callBack) {
    // 获取accessToken
    // const data = {
    //   grant_type: 'client_credential',
    //   appid: this.opt.appid,
    //   secret: this.opt.appsecret,
    // };
    // const res = await getAccessToken(data);
    // if (res.code === 200) {
    //   log.info(res);
    // return JSON.stringify();
    // }
    const data = {
      'access_token': '44_ConlP73WHnjKnjacKz_2qH4smzFU3NQZmWjSAFQvsXuxiyLcHDua46nwJiqIt80d8q0oYuEJs2oYsij3sBeRxoV0JNxuUgLmC6dK-85fEADafcEnuv0EFzwPogmSkV6cZ1-U2ePCsLhMuKUgFWCiADALCI',
      'expires_in': 7200
    };
    callBack(data);
    setTimeout(() => {
      this.initAccessToken(callBack);
    }, 3000);
  };
}

function offiaccount(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof offiaccount)) {
    log_1.warn('offiaccount is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(offiaccount);

const WeChatAPI = {
  offiaccount
};

module.exports = WeChatAPI;
