(function () {
    'use strict';
  
    var log4js = require('log4js');
    var log = log4js.getLogger();
    var mongoose = require('mongoose');
  
  
    // TODO: need a more safety
  
    /**
     * @class UserSchema
     */
    var UserSchema = new mongoose.Schema({
      path: {
        type: String,
        unique: true,
        required: true
      },
      tag: {
        type: String,
        required: false
      },
      tag_info: {
        type: String,
        required: false
      },
      namephoto: {
        type: String,
        required: false
      },
      username: {
        type: String,
        required: true
      },
    });
  
    mongoose.model('photo', UserSchema);
  
  })();
  