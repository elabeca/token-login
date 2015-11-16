'use strict'

let AuthLogsModel = require('../models/authlogs.model');
let moment        = require('moment');

let Authentication = function() {};

// Validating a user's credentials
Authentication.prototype.validateUser = function(username, password) {
  var users = [
    { 'username': 'user',      'password': 'password' },
    { 'username': 'manager',   'password': 'password' },
    { 'username': 'admin',     'password': 'password' },
    { 'username': 'developer', 'password': 'password' },
    { 'username': 'tester',    'password': 'password' }
  ];

  // insecure, should use a hash validation, like bcrypt with data persistence
  let user = users.find(u => (u.username == username) && (u.password === password));
  if (user) return user.username;
};

// Persisting authentication successes and failures in MongoDB
Authentication.prototype.logAuthentication = function(username, ip, isSuccess, cb) {
  var log = new AuthLogsModel();
  log.ip = ip;
  log.datetime = moment().format();
  log.action = isSuccess == true ? 'AUTH_SUCCESS' : 'AUTH_FAILURE';
  log.username = username;

  log.save(function() {
    cb();
  });
};

// Retrieving all authentication attempts previously recorded in MongoDB
Authentication.prototype.getAttempts = function(cb) {
  AuthLogsModel.find({}, function(err, attempts) {
    cb(err, attempts);
  });
};

module.exports = new Authentication();