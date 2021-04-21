import { initMixin } from './instance/init';
import log from '../utils/log';

function offiaccount (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof offiaccount)
  ) {
    log.warn('offiaccount is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(offiaccount);

export default offiaccount;
