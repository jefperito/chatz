Chat em desenvolvimento... 
	
[![Build Status](https://api.travis-ci.org/jefperito/chatz.png)](http://travis-ci.org/#!/jefperito/chatz)
[![Coverage Status](https://coveralls.io/repos/jefperito/chatz/badge.png)](https://coveralls.io/r/jefperito/chatz)

Dependencias: 
 - Arquitetura: node.js + socket.io
 - Qualidade de software: mocha + sinon + istanbul + covehalls + jshint

Dúvidas/requisitos para serem resolvidos:
 - Chat escalável e distribuido? redis como centralizador dos recursos possui o melhor custo benefício?
 - Estabilidade de software, como conseguir? Apenas testes automatizados sana esse tipo de problema?
 - Interface plugável, como conseguir uma interface de fácil injeção em sites de terceiros
 - Interface modular e com boa arquitetura, gerenciar objetos > gerenciar DOMs (knockout.js pode dar uma mão)

Rodar o code coverage com mocha e istanbul: 
istanbul cover _mocha -- -R spec -u tdd ./tests/