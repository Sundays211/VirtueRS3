/**
 * @author Greco
 * @since 06/12/2018
 */

var varp = require('engine/var/player');
var varbit = require('engine/var/bit');

var dialog = require('dialog');
var widget = require('widget');

var anim = require('anim');

module.exports = (function () {
	return {
		init : init
	}
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPHELD1, 550, function (ctx) {//Newcomer map
			widget.openCentral(ctx.player, 270, false);//Newcomer map interface
		});
		
		scriptManager.bind(EventType.OPHELD1, 14057, function (ctx) {//Broomstick
			anim.run(ctx.player, 10532);
		});
		
		
	}
	
}();