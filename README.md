# Token Login Node / AngularJS Demo #

## Installation ##

Ensure to run this demo with node v5.0.0. You may need to `npm install -g bower`.

	$ cd client
	$ bower install
	$ cd ..
	$ npm install

## Usage - (local) ##

	$ npm start

## Running the tests ##

	$ webdriver-manager start

In another terminal process:

	$ npm start

In another terminal process:

	$ npm test

## Authentication data exposed as JSON feed ##

Must supply: x-access-token

	http://<host>/api/auth/attempts

## To Do ##

This is just a demo and work in progress. Nice to have are:

- integration with gulp or grunt
- add to a travis build hook
- use LiveScript or CoffeeScript
- add more unit test coverage
- add credentials persistence in MongoDB + bcrypt hash validation