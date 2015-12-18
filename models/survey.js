// Import mongoose and bcrypt
var mongoose = require('mongoose');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our user Schema
var UserSchema = new Schema({
	name: String,
	template: String,
	active: Date,
	expire: Date,
	noOfQuestions: Number,
	userName: String
	
}, {
	collection: 'surveyInfo'
});
module.exports = mongoose.model('Survey', UserSchema);