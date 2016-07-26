var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AstroLogSchema = new Schema({
	name_of_loc: String,
	obj_observed: String,
	tool: String,
	comments: String,
	rating: Number,
	latitude: Number,
	longitude: Number,
	date: {type:Date, default: new Date()}


 });

var AstroLog = mongoose.model('AstroLog', AstroLogSchema);
module.exports = AstroLog;






 