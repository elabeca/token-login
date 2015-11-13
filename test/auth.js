var request = require('supertest');

var app = require("../server").app;

describe('POST /api/authenticate with invalid credentials', function() {
  it('responds with a 401 Unauthorized', function(done) {
    var user = { username : 'elie', password : 'password' };
    request(app)
      .post('/api/authenticate')
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

describe('POST /api/authenticate with correct username but invalid password', function() {
  it('responds with a 401 Unauthorized', function(done) {
    var user = { username : 'admin', password : 'wrongpassword' };
    request(app)
      .post('/api/authenticate')
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

describe('GET /api/auth/attempts without a token', function() {
  it('responds with a 403 Forbidden', function(done) {
    request(app)
      .get('/api/auth/attempts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403, done);
  });
});

describe('POST /api/authenticate with correct credentials', function() {
  it('responds with a 200', function(done) {
    var user = { username : 'manager', password : 'password' };
    request(app)
      .post('/api/authenticate')
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /api/auth/attempts with a valid token', function() {
  it('responds with a 200', function(done) {
    var user = { username : 'manager', password : 'password' };

    request(app)
      .post('/api/authenticate')
      .set('Accept', 'application/json')
      .send(user)
      .end(function(err, res) {
          var token = res.body.token || '';
          request(app)
            .get('/api/auth/attempts')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
      });
  });
});