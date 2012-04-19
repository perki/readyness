/**
 * Readyness
 * Helper for initial setUp of an app (db, servers..)
 * 
 * License: Do whatever you want with this code 
 * Author: Pierre-Mikael Legris (Perki)
 * Sponsor: simpledata.ch
 */
var watchers = new Array();
var waiting = 0;
var logger;

/**
 * Add a function that will be called when ready. 
 * May be called several times.
 * @param {Function} done 
 */
function doWhen(done) {
  if (waiting == 0) { done(); return ;}
  watchers.push(done);
};
exports.doWhen = doWhen;

/**
 * Announce that we have to wait for a process.
 * @param {String} name (optional) textual information.
 * @returns {Function} call this when this step is ready, 
 * with an (optional String parameter if you want to add info to the logger.
 */
function waitFor(name) {
  waiting++;
  if (waiting == 1) wait_wait();
  //logger.info("waiting for: ["+name+"]");
  return function (info_text) {
    readyDoneOne(name, info_text);
  };
};
exports.waitFor = waitFor;

/**
 * Set a logger and get textual readyness informations
 * @param {Function} _logger 
 */
function setLogger(_logger) {
	logger = _logger;
};
exports.setLogger = setLogger;

//-------- internals ---------------//

function readyDoneOne(name, info_text) {
  waiting--;
  info_text = (info_text == undefined) ? "" : " > "+info_text;
  if (logger) logger("ready: ["+name+"]"+info_text);
  if (waiting > 0) return;
  for (var i = 0; i < watchers.length; i++) { 
    watchers[i]();
  }
}

function wait_wait() {
  if (waiting > 0) setTimeout(wait_wait, 50);
}
