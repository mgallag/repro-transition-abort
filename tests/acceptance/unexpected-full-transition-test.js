import { module, test } from 'qunit';
import { visit, click, currentRouteName } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

const TESTS = [
  ['service', 'controller'],
  ['service', 'route'],
  ['service', 'linkto'],
  ['service', 'service'],

  ['controller', 'controller'],
  ['controller', 'route'],
  ['controller', 'linkto'],
  ['controller', 'service'],

  ['route', 'controller'],
  ['route', 'route'],
  ['route', 'linkto'],
  ['route', 'service'],

  ['linkto', 'controller'],
  ['linkto', 'route'],
  ['linkto', 'linkto'],
  ['linkto', 'service'],
];

module('Acceptance | unexpected full transition', function (hooks) {
  setupApplicationTest(hooks);

  TESTS.forEach(([firstTransition, secondTransition]) => {
    test(`${firstTransition} -> ${secondTransition}`, async function (assert) {
      await visit('/parent/child-a');

      assert.strictEqual(
        currentRouteName(),
        'parent.child-a',
        'Route is correct'
      );
      assert
        .dom('[data-test-parent-transition-count]')
        .matchesText('1', 'ParentRoute model hook only called once.');

      await click(
        `[data-test-transition-${firstTransition}]`,
        `Transition via ${firstTransition}`
      );

      assert.strictEqual(
        currentRouteName(),
        'parent.child-b',
        'Route is correct'
      );
      assert
        .dom('[data-test-parent-transition-count]')
        .matchesText('1', 'ParentRoute model hook only called once.');

      await click(
        `[data-test-transition-${secondTransition}]`,
        `Transition via ${secondTransition}`
      );

      assert.strictEqual(
        currentRouteName(),
        'parent.child-c',
        'Route is correct'
      );
      assert
        .dom('[data-test-parent-transition-count]')
        .matchesText('1', 'ParentRoute model hook only called once.');
    });
  });
});
