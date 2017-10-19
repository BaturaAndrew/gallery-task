var mongoose = require('mongoose');
var Photo = mongoose.model('photo');
var ph = [];
// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb://localhost/passport-example-auth";

var context = [];
Photo.find({}, function (err, photos) {

    context = photos.map(function (photo) {
        return photo.path;

    })
});

// Photo.find({}, function (err, photos) {
//     var context = {
//         photos: photos.map(function (photo) {
//             return {
//                 path: photo.path,
//             }
//         })
//     };

//     // res.render('private', context);

// });


exports.getPhoto = function () {
    console.log(context);
    return context;
};