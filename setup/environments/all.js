(function () {
  'use strict';

  /**
   * Module dependencies.
   */
  var express = require('express');
  var expressLogger = require('../../middlewares/express-logger');
  var passport = require('passport');
  // var rootDir        = process.env.PWD;
  var favicon = require('serve-favicon');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var session = require('express-session');
  var methodOverride = require('method-override');
  var errorhandler = require('errorhandler');
  var routes = express.Router();
  var fs = require("fs");
  // end of dependencies.
  var dataDir = process.cwd() + '/data';
  var PhotoDir = dataDir + '/photo';
  fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
  fs.existsSync(PhotoDir) || fs.mkdirSync(PhotoDir);

  module.exports = function () {
    this.use(express.static(process.cwd() + '/public'));
    this.use(express.static(process.cwd() + '/data'));
    this.set('view engine', 'jade');
    // this.use('/', express.static(rootDir + '/public'));
    this.use(expressLogger);
    this.use(methodOverride());
    this.use(bodyParser.json());
    this.use(bodyParser.urlencoded({ extended: false }));
    this.use(cookieParser());
    this.use(session({
      secret: 'shmecret'
    }));
    this.use(passport.initialize());
    this.use(passport.session());
    this.use(errorhandler());
   
  };

})();