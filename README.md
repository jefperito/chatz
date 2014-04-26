## Chatz

Real time chat built with node.js and socket.io

[![Build Status](https://api.travis-ci.org/jefperito/chatz.png)](http://travis-ci.org/#!/jefperito/chatz)
[![Coverage Status](https://coveralls.io/repos/jefperito/chatz/badge.png)](https://coveralls.io/r/jefperito/chatz)
[![Code Climate](https://codeclimate.com/github/jefperito/chatz.png)](https://codeclimate.com/github/jefperito/chatz)

## To install
 - npm install

## TODO
 - Resolve cyclic reference between socket and user.

## Features
    - Rooms
    - Multiple connections by user
    - Works on smartphones and tablets
    - Websocket/http-polling

## Testes
Run the code coverage with mocha and istanbul:
 - UNIX: istanbul cover _mocha -- -R spec -u tdd ./test/
 - WINDOWS: istanbul cover node_modules/mocha/bin/_mocha -- -R spec -u tdd ./test/
