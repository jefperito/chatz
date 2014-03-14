## Chatz

Chat em desenvolvimento... 
	
[![Build Status](https://api.travis-ci.org/jefperito/chatz.png)](http://travis-ci.org/#!/jefperito/chatz)
[![Coverage Status](https://coveralls.io/repos/jefperito/chatz/badge.png)](https://coveralls.io/r/jefperito/chatz)
[![Code Climate](https://codeclimate.com/github/jefperito/chatz.png)](https://codeclimate.com/github/jefperito/chatz)

## Para instalar:
 - npm install

## Arquitetura

![alt tag](https://raw.github.com/jefperito/chatz/master/docs/Diagram.png)

### Message Service
 - Responsável pela comunicação realtime entre cliente e servidor
 - Protocolos websocket (preferencial) e http-polling
 - node.js e socket.io
 - Transmite mensagens recebidas para o cache service

### Cache Service
 - Responsável em realizar cache im memory das informações transitadas
 - redis
 - orientado à eventos (pub/sub)

### Logging Service
 - Responsável por persistir as mensagens transitadas
 - Ouvir as mudanças do cache service
 - python, gevent, RethinkDb

## Features
 - WebSocket/http-polling como transporte
 - Hard realtime
 - Multi conexões de um mesmo usuario
 - Controle de timeout para armazenamento da sessao do usuario (util para refresh de usuario)
 - Distribuido (recursos compartilhados atraves do redis entre os nodos)
 - Suporta mobile

## Testes
Rodar o code coverage com mocha e istanbul:
 - UNIX: istanbul cover _mocha -- -R spec -u tdd ./tests/
 - WINDOWS: istanbul cover node_modules/mocha/bin/_mocha -- -R spec -u tdd ./tests/

## Dúvidas/requisitos para serem resolvidos
 - Chat escalável e distribuido? redis como centralizador dos recursos possui o melhor custo benefício?
 - Estabilidade de software, como conseguir? Apenas testes automatizados sana esse tipo de problema?
 - Interface plugável, como conseguir uma interface de fácil injeção em sites de terceiros
 - Interface modular e com boa arquitetura, gerenciar objetos > gerenciar DOMs (knockout.js pode dar uma mão)

## TODO
 - Resolver referencia cíclica entre socket e user.
 - Mudar as listas para armazenar no redis
 - Melhorar a demo
 - Listener ser um greenlet
 - Manter coleções de entidade no redis
 - Criar um timer para evitar desconexão por refresh de navegador
 - Refatorar getters/setters para as built in features
