/**
 * 
 */
/* globals ENGINE, Java */
var common = require('./common');

module.exports = (function () {
	return {
		requestMulti : requestMulti,
		multi2 : multi2,
		multi3 : multi3,
		multi4 : multi4,
		multi5 : multi5
	};

	function requestMulti (player, message, options, responses, onSelect) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				var response = value;
				if (responses !== undefined) {
					response = responses[value-1];
				}
				onSelect(response);
			}
		});
		
		ENGINE.requestMulti(player, message, options, responses, new Handler());
	}

	function multi2 (player, message, op1, op1callback, op2, op2callback) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				if (value == 1 && op1callback !== undefined) {
					op1callback();
				} else if (value == 2 && op2callback !== undefined) {
					op2callback();
				}
			}
		});
		
		ENGINE.requestMulti(player, message, [op1, op2], [1, 2], new Handler());
	}

	function multi3 (player, message, op1, op1callback, op2, op2callback, op3, op3callback) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				if (value == 1 && op1callback !== undefined) {
					op1callback();
				} else if (value == 2 && op2callback !== undefined) {
					op2callback();
				} else if (value == 3 && op3callback !== undefined) {
					op3callback();
				}
			}
		});
		
		ENGINE.requestMulti(player, message, [op1, op2, op3], [1, 2, 3], new Handler());
	}

	function multi4 (player, message, op1, op1callback, op2, op2callback, op3, op3callback, op4, op4callback) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				if (value == 1 && op1callback !== undefined) {
					op1callback();
				} else if (value == 2 && op2callback !== undefined) {
					op2callback();
				} else if (value == 3 && op3callback !== undefined) {
					op3callback();
				} else if (value == 4 && op4callback !== undefined) {
					op4callback();
				}
			}
		});
		
		ENGINE.requestMulti(player, message, [op1, op2, op3, op4], [1, 2, 3, 4], new Handler());
	}

	function multi5 (player, message, op1, op1callback, op2, op2callback, op3, op3callback, op4, op4callback, op5, op5callback) {
		var Handler = Java.extend(Java.type('org.virtue.game.content.dialogues.InputEnteredHandler'), {
			handle : function (value) {
				if (value == 1 && op1callback !== undefined) {
					op1callback();
				} else if (value == 2 && op2callback !== undefined) {
					op2callback();
				} else if (value == 3 && op3callback !== undefined) {
					op3callback();
				} else if (value == 4 && op4callback !== undefined) {
					op4callback();
				} else if (value == 5 && op5callback !== undefined) {
					op5callback();
				}
			}
		});
		
		ENGINE.requestMulti(player, message, [op1, op2, op3, op4, op5], [1, 2, 3, 4, 5], new Handler());
	}
})();