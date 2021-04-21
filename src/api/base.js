const request = require('request');
import log from '../utils/log';
import parseParams from '../utils/parseParams';

const baseUrl = 'https://api.weixin.qq.com';

const base = (args) => {
  const { url, method, data, params } = args;

  return new Promise((resolve, reject)=>{

    if (method.toLocaleLowerCase() === 'post') {

      const option = {
        url: baseUrl + url,
        method,
        json: true,
        headers: {
          'content-type': 'application/json',
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


export default args => base(args)
  .then((result) => {
    return result;
  }, () => {
    if (!args.noError) {
      log.error(args);
    }
    return Promise.resolve({
      error: '未知错误'
    });
  });
