/**
 * Created by lixinyi on 2017/11/3.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/users');

module.exports = mongoose.model('User',userSchema);;