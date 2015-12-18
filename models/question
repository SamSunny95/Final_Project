// Import mongoose and bcrypt
var mongoose = require('mongoose');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our user Schema
var UserSchema = new Schema({
	question: String,
	op1: String,
	op2: String,
	op3: String,
	op4: String,
	surveyId: String,
	responses: [{resp:String}]
}, {
	collection: 'questionInfo'
});
module.exports = mongoose.model('Question', UserSchema);