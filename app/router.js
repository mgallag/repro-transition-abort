import EmberRouter from '@ember/routing/router';
import config from 'transition-abort/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('parent', function () {
    this.route('child-a');
    this.route('child-b');
    this.route('child-c');
  });
});
