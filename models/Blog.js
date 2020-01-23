const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	textContent:{
		type:String,
		required:true
	},
	createDate:{
		type:Date,
		default:Date.now
	}
});
module.exports = mongoose.model('blogs',BlogSchema);