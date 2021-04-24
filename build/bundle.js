'use strict';

require('regenerator-runtime/runtime.js');
require('core-js/modules/web.timers.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.promise.js');
var npmlog = require('npmlog');
require('core-js/modules/es.array.for-each.js');
require('core-js/modules/web.dom-collections.for-each.js');
require('core-js/modules/es.object.keys.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.search.js');
require('core-js/modules/es.array.join.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var npmlog__default = /*#__PURE__*/_interopDefaultLegacy(npmlog);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

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
  offiaccount.prototype._init = function (options) {
    if (options === void 0) {
      options = {};
    }

    this.opt = options;
    log_1.info(JSON.stringify(options));
  };

  offiaccount.prototype.initAccessToken = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callBack) {
      var _this = this;

      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
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
              data = {
                'access_token': '44_ConlP73WHnjKnjacKz_2qH4smzFU3NQZmWjSAFQvsXuxiyLcHDua46nwJiqIt80d8q0oYuEJs2oYsij3sBeRxoV0JNxuUgLmC6dK-85fEADafcEnuv0EFzwPogmSkV6cZ1-U2ePCsLhMuKUgFWCiADALCI',
                'expires_in': 7200
              };
              callBack(data);
              setTimeout(function () {
                _this.initAccessToken(callBack);
              }, 3000);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
}

function offiaccount(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof offiaccount)) {
    log_1.warn('offiaccount is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(offiaccount);

var WeChatAPI = {
  offiaccount: offiaccount
};

module.exports = WeChatAPI;
