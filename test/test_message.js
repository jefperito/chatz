var assert = require('assert');

suite('message', function() {
    suite('attributes', function() {
        var Message = require('./../server/models/message');

        test('should set attributes when the Message is initialized', function() {
            var message = new Message({
                sender: {
                    id: 2,
                    name: 'Francieli'
                },
                body: 'WHOA!',
                room_id: 1
            });

            assert.deepEqual({
                id: 2,
                name: 'Francieli'
            }, message.getSender());
            assert.equal('WHOA!', message.getBody());
        });

        test('should get undefined attributes from empty Message', function() {
            var message = new Message();

            assert.equal(undefined, message.getSender());
            assert.equal(undefined, message.getBody());
        });

        test('should hold attributes when set them', function() {
            var message = new Message();

            message.setBody('hello world');
            message.setSender({
                id: 1,
                name: 'Jeferson'
            });

            assert.deepEqual({
                id: 1,
                name: 'Jeferson'
            }, message.getSender());

            assert.equal('hello world', message.getBody());
        });
    });
});