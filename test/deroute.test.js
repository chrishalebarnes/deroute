const { assert } = require('chai');
const Router = require('deroute');

suite('deroute', function() {
  setup(function() {
    window.location.hash = '';
  });

  test('route #view-1 calls the correct callback and view-1 is display: block while others are display: none', function(done) {
    Router.register((match) => {
      match('#view-1', function(url, e) {
        assert.strictEqual(url.hash, '#view-1');
        assert.instanceOf(e, HashChangeEvent);

        var target = document.querySelector('[data-view]:target');
        var views = Array.from(document.querySelectorAll('[data-view]'));
        assert.notStrictEqual(views.length, 0);

        views.forEach(view => {
          var styles = getComputedStyle(view);
          var display = styles.getPropertyValue('display');
          if(view.id === 'view-1') {
            assert.strictEqual(view, target);
            assert.strictEqual(display, 'block');
          } else {
            assert.strictEqual(display, 'none');
          }
        });
        done();
      });
    });
    window.location.hash = '#view-1';
  });

  test('root route is an empty string', function(done) {
    Router.register((match) => {
      match('', function(url, e) {
        done();
      });
    });

    const url = new URL(window.location);
    url.hash = '';
    history.replaceState(null, document.title, url);
  });

  test('dispose deletes all own properties and freezes', function() {
    Router.dispose();
    assert.isUndefined(Router.routes);
    assert.isUndefined(Router.route);
    assert.isUndefined(Router.register);
    assert.isUndefined(Router.handler);
    assert.isFalse(Object.isExtensible(Router));
    assert.isTrue(Object.isFrozen(Router));
  });

  teardown(function() {
    window.location.hash = '';
  });
});
