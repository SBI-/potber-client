import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class SessionRoute extends Route {
  @service declare session: any;

  model() {
    return this.session.sessionData;
  }
}
