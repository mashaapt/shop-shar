import { isArray } from 'lodash';
import { InterceptorInterface, Action } from 'routing-controllers';

const getItem = result => {
  result._doc._id = result._doc._id.toString();
  return result._doc;
}

export class MongoInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {

    if (content._doc) {
      return getItem(content);
    }

    if (isArray(content)) {
      return content.map(item => {
        return getItem(item);
      });
    }

    return content;
  }
}