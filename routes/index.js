(function () {
  'use strict';

  /**
   * Module dependencies.
   */

  var requireTree = require('require-tree');
  var controllers = requireTree('../controllers');
  var mustAuthenticatedMw = require('../middlewares/must-authenticated');
  // End of dependencies.
  var fortune = require('../lib/fortune.js');
  var photos = require('../lib/get-path-photo.js');
  var tags = require('../lib/get-tags-photo.js');
  // File input field name is simply 'photo'
  var multer = require('multer');
  var upload = multer({ dest: '/tmp' });
  var mongoose = require('mongoose');
  var Photo = mongoose.model('photo');
  module.exports = function () {

    // Only for registred users
    this.all('/private', mustAuthenticatedMw);
    this.all('/private/*', mustAuthenticatedMw);

    // Basic routes
    this.get('/', controllers.render('signup', { title: "Register" }));
    this.get('/signup', controllers.render('signup', { title: "Register" }));

    this.get('/private', function (req, res) {
      Photo.find({ username: req.cookies.username}, function (err, photos) {
        var context = {
          photos: photos.map(function (photo) {
            return {
              path: photo.path,
              namephoto: photo.namephoto,
              tag: photo.tag,
            }
          }),
          username: req.cookies.username,
          title: "Gallery",
        };
        res.render('private', context);
      });
    });
   

    this.get('/fail', controllers.render('fail', { title: "Fail" }));
    this.get('/500', controllers.render('500', { title: "500" }));
    this.get('/404', controllers.render('404', { title: "404" }));
    this.get('/error', controllers.render('error', { title: "Error" }));
    this.get('/signin', controllers.render('signin', { title: "Sign In" }));

    // Auth controllers
    this.post('/login', controllers.users.login);
    this.post('/register', controllers.users.register);
    this.get('/logout', controllers.users.logout);
    this.post('/private', upload.single("photo"), controllers.users.loadphoto);

    this.post('/filter', function (req, res) {
      if (req.body.mask === '') {
        Photo.find({ username: req.cookies.username }, function (err, photos) {
          var context = {
            photos: photos.map(function (photo) {
              return {
                path: photo.path,
                namephoto: photo.namephoto,
                tag: photo.tag,
              }
            }),
            username: req.cookies.username,
            title: "Gallery",
          };
          console.log("выводим все картинки")
          res.render('private', context);
        });
      }

      else {
        Photo.find({ username: req.cookies.username , tag: req.body.mask}, function (err, photos) {
          var context = {
            photos: photos.map(function (photo) {
              return {
                path: photo.path,
                namephoto: photo.namephoto,
                tag: photo.tag,
              }
            }),
            username: req.cookies.username,
            title: "Gallery",
          };
          console.log("выводим картинки по тегу", req.body.mask)
          res.render('private', context);
        });
      }
    });

  };

})();
