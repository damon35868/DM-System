import mongoose = require('mongoose');
const ClassTypeSchema = new mongoose.Schema({
	class_type:{
		type:String,
		required:true
	},
	createDate:{
		type:Date,
		default:Date.now()
	},
});

module.exports = mongoose.model('classType',ClassTypeSchema);