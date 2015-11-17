'use strict'

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['client/features/login.spec.js'],
  allScriptsTimeout: 15000
};