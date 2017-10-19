(function () {
  'use strict';

  /**
   * Module dependencies.
   */
  // var log4js = require('log4js');
  // var log = log4js.getLogger('controller/users/register.js');
  // var config = require('nconf');

  var User = require('mongoose').model('user');
  var Photo = require('mongoose').model('photo');
  // End of dependencies.

  // сохраняем пользователя в базу
  module.exports = function (req, res, next) {
    var user = new User({username: req.body.username, email: req.body.email, password: req.body.password});
    user.save(function (err) {
      return err
        ? next(err)
        : req.login(user, function (err) {
          return err
            ? next(err)
            :  res.cookie('username', req.user.username), res.redirect('/private');
        });
    });
  };
 
})();
