// 公众平台接口列表
import ajax from './base.js';

const baseUrl = '/cgi-bin/';

export const getAccessToken = data => ajax({
  params: data,
  method: 'GET',
  url: '/cgi-bin/token'
}); // 获取access_token