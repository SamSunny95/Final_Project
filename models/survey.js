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
	question: String,
	op1:String,
	op2:String, 
	op3:String, 
	op4:String,
	resp:[{answer:String}],
	questions:[{
		text: String,
		options:[{1:String, 2:String, 3:String, 4:String}],
		response:[{ans:String}]
	}]
}, {
	collection: 'surveyInfo'
});
module.exports = mongoose.model('Survey', UserSchema);