'use strict'

var mongoose = require('mongoose');

var authLogs = mongoose.Schema({
	ip: String,
	datetime: String,
	action: String,
	username: String
});

module.exports = mongoose.model('AuthLogs', authLogs);