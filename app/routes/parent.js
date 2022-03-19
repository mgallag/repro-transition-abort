import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ParentRoute extends Route {
  // When a query param is configured in this way, transitioning via the RouterService followed by
  // using LinkTo or any of the deprecated transition methods will trigger an aborted transition.
  // This causes an unexpected refresh of the entire route.
  queryParams = {
    foo: {
      refreshModel: true,
    },
  };

  // Counts number of total calls to the parent route's model hook for each test run.
  numTransitions = 0;

  model() {
    this.numTransitions++;
    return { numTransitions: this.numTransitions };
  }

  @action
  doRouteTransition(routeName) {
    this.transitionTo(routeName);
  }
}
