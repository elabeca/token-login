'use strict'

describe('login to the token-login demo site', function() {
  it('should login successfuly', function() {
    let port = (process.env.PORT || '8080');

    browser.get(`http://localhost:${port}`);

    element(by.model('vm.username')).sendKeys('user');
    element(by.model('vm.password')).sendKeys('password');

    element(by.css('[value="login"]')).click();

    expect(browser.getCurrentUrl()).toMatch(`http://localhost:${port}/#/attempts`);
  });
});