var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ApodSchema = new Schema({
	date: Date,
	title: String,
	mediatype: String,
	url: String,
	copyright: String,
	explaination: String,
	popular: Number
	
 });

var Apod= mongoose.model('Apod', ApodSchema);

module.exports = Apod;