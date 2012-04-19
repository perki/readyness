/**
 * mocha waiter..
 * to be required ahead of you tests
 */

describe('WAIT readyness.js', function(){
  before(function(done) {
    require('readyness').doWhen(done);
  });
});