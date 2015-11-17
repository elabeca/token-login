'use strict'

describe('user login', function() {
  let port = (process.env.PORT || '8080');
  
  beforeEach(function() {
    browser.get(`http://localhost:${port}/#/login/`);
  });
  
  it('login button should be disabled if no values present in username or password input boxes', function() {
    var btn = element(by.css('[value="login"]'));
    expect(browser.isElementPresent(btn)).toBe(true);
    expect(btn.isEnabled()).toBe(false);
  });

  it('login button should be enabled if values present in username and password input boxes', function() {
    element(by.model('loginCtrl.username')).sendKeys('user');
    element(by.model('loginCtrl.password')).sendKeys('password');
    var btn = element(by.css('[value="login"]'));
    expect(browser.isElementPresent(btn)).toBe(true);
    expect(btn.isEnabled()).toBe(true);
  });

  it('should login successfuly', function() {
    element(by.model('loginCtrl.username')).sendKeys('user');
    element(by.model('loginCtrl.password')).sendKeys('password');

    element(by.css('[value="login"]')).click();

    expect(browser.getCurrentUrl()).toMatch(`http://localhost:${port}/#/attempts`);
  });

  it('should fail to login', function() {
    element(by.model('loginCtrl.username')).sendKeys('admin');
    element(by.model('loginCtrl.password')).sendKeys('wrongpassword');

    element(by.css('[value="login"]')).click();

    expect(browser.getCurrentUrl()).toMatch(`http://localhost:${port}/#/login`);
  });
});