'use strict'

let cluster   = require('cluster');
let _			    = require('lodash');
let config    = require('./config');
let numCores  = require('os').cpus().length;

// Handling workers dying
cluster.on('exit', function(worker) {
    console.log(`Worker #${worker.id} died - replacing now`);
    // Spawning a new worker to replace
    cluster.fork();
});

if (process.env.NODE_ENV !== 'test') {
  if (cluster.isMaster) {
     // Create a worker for each core
    for (var i = 0; i < numCores; i += 1) {
        cluster.fork();
    }
  } else {
    // Worker
    setupServer(cluster.worker.id);
  }
} else {
  // Setting up only one process when running mocha tests
  setupServer(1);
}

function setupServer(workerId) {
  let express         = require('express');
  let bodyParser      = require('body-parser');
  let morgan          = require('morgan');
  let mongoose        = require('mongoose');
  let jwt             = require('jsonwebtoken');
  let authentication  = require('./services/authentication.service');

  let app             = exports.app = express();

  // Configuration
  let port = process.env.PORT || 8080;
  mongoose.connect(config.database);
  app.set('apiSecret', config.secret);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  // Console logger
  app.use(morgan('dev'));

  var apiRoutes = express.Router();

  // Routes
  apiRoutes.post('/authenticate', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var username = authentication.validateUser(req.body.username, req.body.password);

    if (!username) {
      authentication.logAuthentication(req.body.username, ip, false, function() {
        res.status(401).json({ success: false, message: 'Invalid credentials!' });
      });
    } else  {
      authentication.logAuthentication(req.body.username, ip, true, function() {
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
    if (req.decoded === 'admin') {
      let result = authentication.getAttempts(function(err, attempts) {
        var result = {};
        attempts.forEach(function(attempt) {
            result[attempt._id] = attempt;
        });
        res.json({ result: result });
      });
    } else {
      return res.status(403).send({ 
          success: false, 
          message: 'Unauthorized!' 
      });
    }
  });

  app.use('/api', apiRoutes);

  app.listen(port);
  console.log(`Worker #${workerId} has started on port: ${port}\n`);
}