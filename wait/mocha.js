/**
 * mocha waiter..
 * to be required ahead of you tests
 */

describe('readyness.js gate', function() {
  before(function(done) {
    require('readyness').doWhen(done);
  });
  it('is unlocked for testing', function() { return true; });
});