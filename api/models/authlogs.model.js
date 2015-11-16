'use strict'

let mongoose = require('mongoose');

let authLogs = mongoose.Schema({
	ip: String,
	datetime: String,
	action: String,
	username: String
});

module.exports = mongoose.model('AuthLogs', authLogs);