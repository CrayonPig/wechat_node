'use strict';

const weChatApiExample = require('../example/index');
function WeChatAPI () {
  return 'bac12311';
}



if (process.env.NODE_ENV === 'development') {
  weChatApiExample();
}

module.exports = WeChatAPI;
