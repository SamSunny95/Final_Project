// Import mongoose and bcrypt
var mongoose = require('mongoose');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;

// Define our user Schema
var UserSchema = new Schema({
	response: String,
	questionId: String
}, {
	collection: 'answerInfo'
});
module.exports = mongoose.model('Answer', UserSchema);