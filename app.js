(function () {
  'use strict';

  var express = require('express');
  var bootable = require('bootable');
  var bootableEnv = require('bootable-environment');
  var log4js = require('log4js');
  var log = log4js.getLogger('app.js');
  var config = require('config');
  var app = bootable(express());

  // Setup initializers
  app.phase(bootable.initializers('setup/initializers/'));

  // Setup environments
  app.phase(bootableEnv('setup/environments/', app));

  // Setup routes
  app.phase(bootable.routes('routes/', app));

app.set('port', process.env.PORT ||config.get('express.port'));

app.set('env', 'production');
global.env='production';
  // Boot app
  app.boot(function (err) {
    if (err) { throw err; }
    app.listen(app.get('port'), function () {
      log.info('Express запущено в режиме ' + app.get('env') + 'на port', config.get('express.port'));
    });
  });

})();
