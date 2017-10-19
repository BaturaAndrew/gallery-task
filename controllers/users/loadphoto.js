(function () {
    'use strict';

    /**
     * Module dependencies.
     */
    var log4js = require('log4js');
    var log = log4js.getLogger('controller/users/loadphoto.js');
    var fs = require('fs');
    var Photo = require('mongoose').model('photo');
    // Проверяем, существует ли каталог
    var dataDir = process.cwd() + '/data';
    var PhotoDir = dataDir + '/photo';
    fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
    fs.existsSync(PhotoDir) || fs.mkdirSync(PhotoDir);

    module.exports = function (req, res, next) {

        var file = __dirname + '/' + req.file.originalname;
        var userRoot = PhotoDir + '/' + req.cookies.username + '/';
        fs.existsSync(userRoot) || fs.mkdirSync(userRoot);

        var path = userRoot + req.file.originalname;
        console.log('Name photo ' + req.file.originalname);
        console.log('Name temp photo ' + req.file.path);

        fs.readFile(req.file.path, function (err, data) {
            fs.writeFile(path, data, function (err) {
            });
            // записываем в БД
            var namephoto = req.body.namephoto;
            var tag = req.body.tag;
            var photoDB = new Photo({
                path: '/photo/' + req.cookies.username + '/' + req.file.originalname,
                tag: tag, namephoto: namephoto, username: req.cookies.username
            }).save();
        });

        res.redirect('/private');
    };

})();
