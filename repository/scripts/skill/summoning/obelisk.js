/**
 * @author Greco
 * @since 12/10/2016
 */
/* globals EventType */
var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var dialog = require('dialog');
var widget = require('widget');
var anim = require('anim');

var makex = require('../makex');

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