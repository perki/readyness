/**
 * mocha waiter..
 * to be required ahead of you tests
 */

describe('readyness.js', function(){
  before(function(done) {
    require('../../utils/readyness').doWhen(done);
  });
});