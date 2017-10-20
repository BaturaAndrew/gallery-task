// Any files in this directory will be `require()`'ed when the application
// starts, and the exported function will be invoked with a `this` context of
// the application itself.  Initializers are used to connect to databases and
// message queues, and configure sub-systems such as authentication.

// Async initializers are declared by exporting `function(done) { /*...*/ }`.
// `done` is a callback which must be invoked when the initializer is
// finished.  Initializers are invoked sequentially, ensuring that the
// previous one has completed before the next one executes.

(function () {
  'use strict';

  var log4js = require('log4js');
  var log = log4js.getLogger('01_mongoose.js');
  var config = require('config');

  var mongoose = require('mongoose');
  var requireTree = require('require-tree');
  var models = requireTree('../../models/');

  var opts = {
    server: {
      socketOptions: { keepAlive: 1 }
    }
  };
  module.exports = function (done) {

    mongoose.connection.on('open', function () {
      log.info('Connected to mongo server!');
      if (done) return done();
    });

    mongoose.connection.on('error', function (err) {
      log.error('Could not connect to mongo server!');
      log.error(err.message);
      if (done) return done(err);
    });

    try {
      
      switch(global.env){
        case 'development':
        mongoose.connect(config.get('mongoose.development.db'), opts);
        break;
        case 'production':
        mongoose.connect(config.get('mongoose.production.db'), opts);
        break;
        default:
        throw new Error('Неизвестная среда выполнения: ' +global.env);
        }

      log.info('Started connection on ' + (config.get('mongoose.development.db')) + ', waiting for it to open...');
    } catch (err) {
      log.error(('Setting up failed to connect to ' + config.get('mongoose.development.db')), err.message);
      if (done) done(err);
    }

  };

})();
