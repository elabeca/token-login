# Token Login Node / AngularJS Demo #

## DEMO ##

Try out the online [Demo here!](https://cryptic-forest-2028.herokuapp.com)

## Before installing locally ##

Ensure your computer has access to the following URL: ds047524.mongolab.com:47524

## Installation ##

Ensure to run this demo locally with node v5.0.0. You may need to `npm install -g bower`.

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

This is just a demo and work in progress. Still need to or some nice to have:

- after each integration test run - remove auth attempts created from DB
- add more unit test coverage (both api and client)
- finish up the attempts page (server side paging)
- integration with gulp or grunt
- add to a travis build hook
- use LiveScript or CoffeeScript
- add credentials persistence in MongoDB + bcrypt hash validation