import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const ROUTES = ['parent.child-a', 'parent.child-b', 'parent.child-c'];

export default class ParentController extends Controller {
  @service router;

  // This query param is not set anywhere in the code and does not change
  queryParams = ['p'];
  @tracked p = null;

  get nextRouteName() {
    let nextIdx = ROUTES.indexOf(this.router.currentRouteName) + 1;
    if (nextIdx >= ROUTES.length) {
      nextIdx = 0;
    }
    return ROUTES[nextIdx];
  }

  @action
  transitionViaService(routeName) {
    this.router.transitionTo(routeName);
  }

  @action
  transitionViaController(routeName) {
    this.transitionToRoute(routeName);
  }

  @action
  transitionViaRoute(routeName) {
    this.send('doRouteTransition', routeName);
  }
}
