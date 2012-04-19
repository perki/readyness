/**
 * Readyness
 * Helper for initial setUp of an app (db, servers..)
 * 
 * License: Do whatever you want with this code 
 * Author: Pierre-Mikael Legris (Perki)
 * 
 * Exemples: 
 * ** setup redis readyness **
 *     
 *     var ready = require('../utils/readyness');
 *     var redis = require('redis').createClient();
 *
 *     var connectionChecked = ready.waitFor('database');
 *     // check redis connectivity
 *     redis.set('hello','world', function(error, result) {
 *      connectionChecked();
 *     }
 *   
 * ** start mocha test only when everything is ready
 * ** create a simple waiter.js file that you require in all your tests
 *    
 *     describe('WAITER', function(){
 *     before(function(done) {
 *      require('../../utils/readyness').doWhen(done);
 *      });
 *    });
 * 
 */
var watchers = new Array();
var waiting = 0;
var logger = require('winston');

exports.doWhen = function (done) {
  if (waiting == 0) return done();
  watchers.push(done);
}

exports.waitFor = function (name) {
  waiting++;
  if (waiting == 1) wait_wait();
  //logger.info("waiting for: ["+name+"]");
  return function (info_text) {
    readyDoneOne(name, info_text);
  }
}

function readyDoneOne(name, info_text) {
  waiting--;
  info_text = (info_text == undefined) ? "" : " > "+info_text;
  
  logger.info("ready: ["+name+"]"+info_text);
  if (waiting > 0) return;
  for (var i = 0; i < watchers.length; i++) { 
    watchers[i]();
  }
}

function wait_wait() {
  if (waiting > 0) setTimeout(wait_wait, 50);
}
