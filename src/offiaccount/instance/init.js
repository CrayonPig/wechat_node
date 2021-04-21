import { getAccessToken } from '../../api/offiaccount';
import log from '../../utils/log';

export function initMixin (offiaccount) {
  offiaccount.prototype._init = function (options = {}) {
    this.opt = options;
    log.info(JSON.stringify(options));
  };


  offiaccount.prototype.initAccessToken = async function  () {
    // 获取accessToken
    const data = {
      grant_type: 'client_credential',
      appid: this.opt.appid,
      secret: this.opt.appsecret,
    };
    const res = await getAccessToken(data);
    if (res.code === 200) {
      log.info(res);
    // return JSON.stringify({ 'access_token': '44_ConlP73WHnjKnjacKz_2qH4smzFU3NQZmWjSAFQvsXuxiyLcHDua46nwJiqIt80d8q0oYuEJs2oYsij3sBeRxoV0JNxuUgLmC6dK-85fEADafcEnuv0EFzwPogmSkV6cZ1-U2ePCsLhMuKUgFWCiADALCI', 'expires_in': 7200 });
    }
  };
}

