(function () {
  'use strict';

  /**
   * Module dependencies.
   */
  var log4js         = require('log4js');
  var log            = log4js.getLogger('controller/users/login.js');
  var passport       = require('passport');
  // End of dependencies.


  module.exports = function(req, res, next) {

    // log.info(req.user.username + ' trying to login');

    // passport.authenticate('local', {
    //   successRedirect: '/private',
    //   failureRedirect: '/'
    // })(req, res, next);

    
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/signin'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        //Сохраняем имя пользователя в куки
        res.cookie('username', req.user.username);
        return res.redirect('/private');
      });
    })(req, res, next);

     
  };

})();
