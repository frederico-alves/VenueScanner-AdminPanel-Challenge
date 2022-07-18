var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var ClientSchema = new mongoose.Schema({
    firstname: String,
    surname: String,
    email: String,
    password: String
},{usePushEach:true});

ClientSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model('Client', ClientSchema);
//