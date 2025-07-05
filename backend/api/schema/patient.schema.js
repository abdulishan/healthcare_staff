const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
		fullName: {
			type: String,
		},
		mobileNo: {
			type: String
		},
		empType: {
			type: String
		},
		email: {
			type: String,
			lowercase: true,
		},
		password: {
			type: String,
		},
	},
	{ timestamps: true });

module.exports = mongoose.model('Users', UserSchema);