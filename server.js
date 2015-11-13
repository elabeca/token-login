var _			= require('lodash');
var express     = require('express');
var bodyParser	= require('body-parser');
var morgan		= require('morgan');
var mongoose    = require('mongoose');
var jwt			= require('jsonwebtoken');
var config		= require('./config');
var moment		= require('moment');
var path    = require("path");
var AuthLogs    = require('./app/models/auth_logs');

var app         = exports.app = express();

// Configuration
var port = port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('apiSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));
app.use(express.static('client/login'));
app.use(express.static('client/content'));

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
apiRoutes.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
})

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

// Token validation middleware
apiRoutes.use(function(req, res, next) {
  var token =  req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('apiSecret'), function(error, decoded) {      
      if (error) {
        return res.json({ success: false, message: 'Token validation failed!' });    
      } else {
        // apply token to other routes
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'Missing token!' 
    });
  }
});

apiRoutes.get('/auth/attempts', function(req, res) {
  AuthLogs.find({}, function(err, attempts) {
    var result = {};
    
    attempts.forEach(function(attempt) {
      result[attempt._id] = attempt;
    });

    res.json({ result: result });
  });
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('Appplication has started on port: ' + port);