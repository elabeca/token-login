var express     = require('express');
var bodyParser	= require('body-parser');
var morgan		= require('morgan');
var mongoose    = require('mongoose');
var jwt			= require('jsonwebtoken');
var config		= require('./config');
var moment      = require('moment');
var _			= require('lodash');
var AuthLogs    = require('./app/models/auth_logs');

var app         = exports.app = express();

// Configuration
var port = port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('apiSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Console logger
app.use(morgan('dev'));

var apiRoutes = express.Router();

var validateUser = function(username, password) {
  var users = [
    { 'username': 'user',      'password': 'password' },
    { 'username': 'manager',   'password': 'password' },
    { 'username': 'admin',     'password': 'password' },
    { 'username': 'developer', 'password': 'password' },
    { 'username': 'tester',    'password': 'password' }
  ];

  return _.result(_.find(users, function(user) {
    // insecure, should use a hash validation, like bcrypt with data persistence
    return ((user.username == username) && (user.password == password));
  }), 'username');
};

var logAuthentication = function(username, ip, isSuccess, cb) {
  var log = new AuthLogs();
  log.ip = ip;
  log.datetime = moment().format();
  log.action = isSuccess == true ? 'AUTH_SUCCESS' : 'AUTH_FAILURE';
  log.username = username;

  log.save(function () {
    cb();
  });
};

// Routes
apiRoutes.post('/authenticate', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	var username = validateUser(req.body.username, req.body.password);

  if (!username) {
    logAuthentication(req.body.username, ip, false, function() {
      res.status(401).json({ success: false, message: 'Invalid credentials!' });
    });
  } else  {
    logAuthentication(req.body.username, ip, true, function() {
      var token = jwt.sign(username, app.get('apiSecret'), {
        expiresIn: 1440 * 60
      });

      res.json({
        success: true,
        message: 'Authentication success!',
        token: token
      });
    });
	}
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('Appplication has started on port: ' + port);