import { InterceptorInterface, Action } from 'routing-controllers';

export class MongoInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    content._doc._id = content._doc._id.toString();
    return content._doc;
  }
}