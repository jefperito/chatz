var assert = require('assert');

suite('message', function() {
	suite('attributes', function() {
		var Message = require('./../server/models/message');

		test('should set attributes when the Message is initialized', function() {
			var message = new Message({
				target_id: 1,
				sender_id: 2,
				body: 'WHOA!'
			});

			assert.equal(1,       message.getTargetId());
			assert.equal(2,       message.getSenderId());
			assert.equal('WHOA!', message.getBody());
		});

		test('should get undefined attributes from empty Message', function() {
			var message = new Message();

			assert.equal(undefined, message.getTargetId());
			assert.equal(undefined, message.getSenderId());
			assert.equal(undefined, message.getBody());
		});

		test('should hold attributes when set them', function() {
			var message = new Message();

			message.setBody('hello world');
			message.setSenderId(1);
			message.setTargetId(2);

			assert.equal(2,             message.getTargetId());
			assert.equal(1,             message.getSenderId());
			assert.equal('hello world', message.getBody());
		});
	});
});
