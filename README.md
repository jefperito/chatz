## Chatz

Chat em desenvolvimento...

[![Build Status](https://api.travis-ci.org/jefperito/chatz.png)](http://travis-ci.org/#!/jefperito/chatz)
[![Coverage Status](https://coveralls.io/repos/jefperito/chatz/badge.png)](https://coveralls.io/r/jefperito/chatz)
[![Code Climate](https://codeclimate.com/github/jefperito/chatz.png)](https://codeclimate.com/github/jefperito/chatz)

## Para instalar:
 - npm install

## O que falta fazer para o primeiro release
 - Resolver referência cíclica entre socket e user.
 - Refatorar getters/setters para as built in features
 - browserify (talvez)
 - Documentação em inglês
 - Demos

## Testes
Rodar o code coverage com mocha e istanbul:
 - UNIX: istanbul cover _mocha -- -R spec -u tdd ./test/
 - WINDOWS: istanbul cover node_modules/mocha/bin/_mocha -- -R spec -u tdd ./test/
