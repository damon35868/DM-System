  import mongoose = require('mongoose');
  
  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    email:  {
		type:String,
		required: true
	},
    password: {
		type:String,
		required: true
	},
	user_name:{
		type:String,
		required: true
	},
	avatar:String,
	title:String,
	createDate:{
		type:Date,
		default: Date.now
	}
  });
  
module.exports = mongoose.model('users',userSchema);
  
// export {}