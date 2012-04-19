readyness.js
============

`know when your service is up and running`

For Node.js

**Readyness** will help you lock some calls and wait until your service is up and running.

Usefull when you have to be sure that your database is connected and server listening before starting your tests.

I personnaly wrote it to be sure that everything was ready before doing any test with mocha.

Pierre-Mikael Legris (Perki)  
License: "Do whatever you want v2.1"  
Sponsor: SimpleData Sàrl : simpledata.ch  

## Exemples 
 **setup redis readyness (could be your database.js file)**
      
    var ready = require('readyness');
    ready.setLogger(console.log); // optional, you may set your own preffered logger
    
    var redis = require('redis').createClient();
 
    var connectionChecked = ready.waitFor('database');
    
    // check redis connectivity
    redis.set('hello','world', function(error, result) {
      connectionChecked();
    }
 
 
 **lock on server socket opening**
 
	var appListening = require('readyness').waitFor('app:listening');
	app.listen(3080, 127.0.0.1, function() {  
	  // called with a text parameter for debugging purpose
  	  appListening('Register server on port: '+app.address().port);
	});



**start mocha tests only when everything is ready**

    describe('WAITER', function(){
      before(function(done) {
        require('readyness').doWhen(done);
      });
    });


**shortcut to the previous code (waiter for mocha)**

	require('readyness/wait/mocha');

## Specs
### readyness.waitFor(text)
Returns a function that has to be called when the process is ready.  
*The **text** parameter is optional, and used for logging purpose.*  

The returned function can be called also with an optional text parameter it will be displayed if you have set a logger.

### readyness.doWhen(callback)
The passed callbacks will be called as soon as the app is ready.

You may register as many callback as necessary

### readyness.setLogger(function)
If you need some logging put your preffered logger there. 
It has to be done only once per project.

I'm not very confortable with this solution.. Comments are welcome...  
For now I set the logger once in my main.js file. 

## Waiter for mocha (and others)
As I tried to resolve a problem encoutered with mocha, I wrote a little piece of just for it.
if you add a `require('readyness/wait/mocha');` in the first lines of your tests files, then mocha will not process any test before readyness.

Contributions for other waiters codes are welcome!