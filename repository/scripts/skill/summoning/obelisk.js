/**
 * @author Greco
 * @since 12/10/2016
 */
/* globals EventType, ENGINE */
var varp = require('../../core/var/player');
var varbit = require('../../core/var/bit');

var makex = require('../makex');
var dialog = require('../../core/dialog');
var widget = require('../../core/widget');
var anim = require('../../core/anim');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [ 67036, 94230 ], function (ctx) {
			startSummoning(ctx.player);
		});
	}
	
	function startSummoning (player) {
		makex.selectProduct(player, 6932, 6933, 6934);
		dialog.setResumeHandler(player, function () {
			widget.closeAll(player);
			var productId = varp(player, 1170);
			var amount = varbit(player, 1003);
			if (amount) {
				createPouches(player, productId, amount);
			}
		});
	}
	
	function createPouches (player, productId, amount) {
		makex.makeItem(player, productId, amount);
		anim.run(player, 8500);
	}
})();