readyness.js
============

`know when your service is up and running`

###For Node.js 

**Readyness** will help you lock some calls and wait until your service is up and running.

Useful when you have to be sure that your database is connected and server listening before starting your tests. Written with mocha in mind.

Pierre-Mikael Legris (Perki)  
License: "Do whatever you want v2.1"  
Sponsor: SimpleData SÃ rl : simpledata.ch  

**Install it with** `npm install readyness`

## Examples 
 **setup redis readyness (could be your database.js file)**
      
    var ready = require('readyness');
    ready.setLogger(console.log); // optional, you may set your own preferred logger
    
    var redis = require('redis').createClient();
 
    var connectionChecked = ready.waitFor('database');
    
    // check redis connectivity
    redis.set('hello','world', function(error, result) {
      connectionChecked();
    }
 
 
 **lock on server socket opening**
 
  var appListening = require('readyness').waitFor('app:listening');
  app.listen(3080, 127.0.0.1, function() {  
    // called here with a text parameter for debugging purpose
      appListening('Register server on port: '+app.address().port);
  });



**start mocha tests only when everything is ready**

    describe('WAITER', function(){
      before(function(done) {
        require('readyness').doWhen(done);
      });
      it('readyness.js is ready', function() { return true; });
    });


**shortcut to the previous code (waiter for mocha)**

  require('readyness/wait/mocha');

## Methods
### readyness.waitFor(text)
Registers a task to be watched.
Returns a function that has to be called when the task is complete.  
*The **text** parameter is optional, and used for logging purpose. The returned function can also optionally take a text parameter which will be displayed if you have set a logger.*

### readyness.doWhen(callback)
The passed callbacks will be called as soon as all tasks have been completed.

You may register as many callbacks as necessary.

### readyness.setLogger(function)
If you need some logging put your preferred logger there. 
It has to be done only once per project.

I'm not very comfortable with this solution.. Comments are welcome...  
For now I set the logger once in my main.js file. 

## Waiter for mocha (and others)
As I tried to resolve a problem encoutered with mocha, I wrote a little piece of just for it.
if you add a `require('readyness/wait/mocha');` in the first lines of your test's files, then mocha will not process any test before readyness.

Contributions of waiters for other testing frameworks are welcome!