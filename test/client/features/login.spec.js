'use strict'

describe('login to the token-login demo site', function() {
  it('should login successfuly', function() {
    let port = (process.env.PORT || '8080');

    browser.get(`http://localhost:${port}`);

    element(by.model('loginCtrl.username')).sendKeys('user');
    element(by.model('loginCtrl.password')).sendKeys('password');

    element(by.css('[value="login"]')).click();

    expect(browser.getCurrentUrl()).toMatch(`http://localhost:${port}/#/attempts`);
  });

  it('should fail to login', function() {
    let port = (process.env.PORT || '8080');

    browser.get(`http://localhost:${port}`);

    element(by.model('loginCtrl.username')).sendKeys('admin');
    element(by.model('loginCtrl.password')).sendKeys('wrongpassword');

    element(by.css('[value="login"]')).click();

    expect(browser.getCurrentUrl()).toMatch(`http://localhost:${port}/#/login`);
  });
});