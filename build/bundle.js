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

const parseParams = (uri, params) => {
  const paramsArray = [];
  Object.keys(params).forEach(key => params[key] && paramsArray.push(`${key}=${params[key]}`));

  if (uri.search(/\?/) === -1) {
    uri += `?${paramsArray.join('&')}`;
  } else {
    uri += `&${paramsArray.join('&')}`;
  }

  return uri;
};

const request = require('request');
const baseUrl = 'https://api.weixin.qq.com';

const base = args => {
  const {
    url,
    method,
    data,
    params
  } = args;
  return new Promise((resolve, reject) => {
    if (method.toLocaleLowerCase() === 'post') {
      const option = {
        url: baseUrl + url,
        method,
        json: true,
        headers: {
          'content-type': 'application/json'
        },
        body: data
      };
      request(option, function (error, response, body) {
        if (error) {
          reject(error);
        }

        if (!error && response.statusCode == 200) {
          resolve(body);
        }
      });
    } else if (method.toLocaleLowerCase() === 'get') {
      const getUrl = parseParams(baseUrl + url, params);
      request(getUrl, function (error, response, body) {
        if (error) {
          reject(error);
        }

        if (!error && response.statusCode == 200) {
          resolve(body);
        }
      });
    }
  });
};

var ajax = (args => base(args).then(result => {
  return result;
}, () => {
  if (!args.noError) {
    log_1.error(args);
  }

  return Promise.resolve({
    error: '未知错误'
  });
}));

// 公众平台接口列表
const getAccessToken = data => ajax({
  params: data,
  method: 'GET',
  url: '/cgi-bin/token'
}); // 获取access_token

function initMixin(offiaccount) {
  offiaccount.prototype._init = function (options = {}) {
    this.opt = options;
    log_1.info(JSON.stringify(options));
  };

  offiaccount.prototype.initAccessToken = async function () {
    // 获取accessToken
    const data = {
      grant_type: 'client_credential',
      appid: this.opt.appid,
      secret: this.opt.appsecret
    };
    const res = await getAccessToken(data);

    if (res.code === 200) {
      log_1.info(res); // return JSON.stringify({ 'access_token': '44_ConlP73WHnjKnjacKz_2qH4smzFU3NQZmWjSAFQvsXuxiyLcHDua46nwJiqIt80d8q0oYuEJs2oYsij3sBeRxoV0JNxuUgLmC6dK-85fEADafcEnuv0EFzwPogmSkV6cZ1-U2ePCsLhMuKUgFWCiADALCI', 'expires_in': 7200 });
    }
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
