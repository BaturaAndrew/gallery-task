var mongoose = require('mongoose');
var Photo = mongoose.model('photo');
var ph = [];
// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb://localhost/passport-example-auth";

var tags = [];
Photo.find({}, function (err, photos) {

    tags = photos.map(function (photo) {
        return photo.tag;
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


exports.getTags = function () {
    console.log(tags);
    return tags;
};