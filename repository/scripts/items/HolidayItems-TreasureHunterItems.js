/**
 * Copyright (c) 2017 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
 
var anim = require('../../core/anim');
var chat = require('../../chat');
var inv = require('../../inv');
var varp = require('../../core/var/player');
var varc = require('../../core/var/client');
var widget = require('../../widget');

module.exports = (function () {
	return {
		init : init
	};
	function init (scriptManager) {	 
    scriptManager.bind(EventType.OPHELD1, 36093, function (ctx) {//Large dungeoneering token box
	chat.sendMessage(ctx.player, "<col=00ff00>You gain 3,970 dungeoneering tokens. You now have "+ varp(ctx.player, 1097) +" tokens.");	 
	});	 
	scriptManager.bind(EventType.OPHELD1, 19832, function (ctx) {//Bone brooch
	api.setSpotAnim(ctx.player, 1, 2838);
	anim.run(ctx.player, 14870, function () {
	ctx.player.getModel().setRender(Render.NPC);
	ctx.player.getModel().setNPCId(12373);
	ctx.player.getModel().refresh();
	anim.run(ctx.player, 520);	
    });
    varc(ctx.player, 1727, 1);
	widget.openOverlaySub(ctx.player, 1008, 375, false);	
	});		 
	scriptManager.bind(EventType.OPHELD1, 11950, function (ctx) {//Snow globe
    widget.openCentral(ctx.player, 659, false);
	});	 
	scriptManager.bind(EventType.OPHELD1, 22325, function (ctx) {//Dance floor manual (haloween 2011)
    widget.openCentral(ctx.player, 1150, false);
	});		 
	scriptManager.bind(EventType.OPHELD1, 20078, function (ctx) {//Heimland games souvenir
   //anim.run(ctx.player, 12913);
   //anim.run(ctx.player, 15105);
	});
	scriptManager.bind(EventType.OPHELD1, 28134, function (ctx) {//sparkler
    anim.run(ctx.player, 20139);
	api.setSpotAnim(ctx.player, 1, 3953);
	inv.take(ctx.player, 28134, 1);
	});
    scriptManager.bind(EventType.OPHELD1, 6865, function (ctx) {//blue marionette jump
    anim.run(ctx.player, 3003);
	api.setSpotAnim(ctx.player, 1, 511);
	});
	scriptManager.bind(EventType.OPHELD1, 6866, function (ctx) {//green marionette jump
    anim.run(ctx.player, 3003);
	api.setSpotAnim(ctx.player, 1, 515);
	});
	scriptManager.bind(EventType.OPHELD1, 6867, function (ctx) {//red marionette jump
    anim.run(ctx.player, 3003);
	api.setSpotAnim(ctx.player, 1, 507);
	});
	scriptManager.bind(EventType.OPHELD1, 4079, function (ctx) {//Yo-yo play
    anim.run(ctx.player, 1457);
	});
	scriptManager.bind(EventType.OPHELD1, 6722, function (ctx) {//Zombie head talk at
	ENGINE.playerForceSay(ctx.player, "Alas!", false);
    anim.run(ctx.player, 2840);
	});
	
	
	scriptManager.bind(EventType.OPHELD2, 4565, function (ctx) {//basket of eggs
    //api.setRenderAnim(player, 594);
	});
	scriptManager.bind(EventType.OPHELD2, 6865, function (ctx) {//blue marionette walk
    anim.run(ctx.player, 3004);
	api.setSpotAnim(ctx.player, 1, 512);
	});
	scriptManager.bind(EventType.OPHELD2, 6866, function (ctx) {//green marionette walk
    anim.run(ctx.player, 3004);
	api.setSpotAnim(ctx.player, 1, 516);
	});
	scriptManager.bind(EventType.OPHELD2, 6867, function (ctx) {//red marionette walk
    anim.run(ctx.player, 3004);
	api.setSpotAnim(ctx.player, 1, 508);
	});
	scriptManager.bind(EventType.OPHELD2, 4079, function (ctx) {//Yo-yo loop
    anim.run(ctx.player, 1458);
	});
	scriptManager.bind(EventType.OPHELD2, 6722, function (ctx) {//Zombie head Display
	ENGINE.playerForceSay(ctx.player, "Mwuhahahaha!", false);
    anim.run(ctx.player, 2844);
	});
	
	
	scriptManager.bind(EventType.OPHELD3, 14742, function (ctx) {//Lily of the valley
    anim.run(ctx.player, 11622);
	});
	scriptManager.bind(EventType.OPHELD3, 6865, function (ctx) {//blue marionette bow
    anim.run(ctx.player, 3005);
	api.setSpotAnim(ctx.player, 1, 513);
	});
	scriptManager.bind(EventType.OPHELD3, 6866, function (ctx) {//green marionette bow
    anim.run(ctx.player, 3005);
	api.setSpotAnim(ctx.player, 1, 517);
	});
	scriptManager.bind(EventType.OPHELD3, 6867, function (ctx) {//red marionette bow
    anim.run(ctx.player, 3005);
	api.setSpotAnim(ctx.player, 1, 509);
	});
	scriptManager.bind(EventType.OPHELD3, 4079, function (ctx) {//Yo-yo walk
    anim.run(ctx.player, 1459);
	});
	scriptManager.bind(EventType.OPHELD3, 15353, function (ctx) {//eek play
    anim.run(ctx.player, 12490);
	api.setSpotAnim(ctx.player, 1, 2178);
	});
	
	
	scriptManager.bind(EventType.OPHELD4, 6865, function (ctx) {//blue marionette dance
    anim.run(ctx.player, 3006);
	api.setSpotAnim(ctx.player, 1, 514);
	});
	scriptManager.bind(EventType.OPHELD4, 6866, function (ctx) {//green marionette dance
    anim.run(ctx.player, 3006);
	api.setSpotAnim(ctx.player, 1, 518);
	});
	scriptManager.bind(EventType.OPHELD4, 6867, function (ctx) {//red marionette dance
    anim.run(ctx.player, 3006);
	api.setSpotAnim(ctx.player, 1, 510);
	});
	scriptManager.bind(EventType.OPHELD4, 4079, function (ctx) {//Yo-yo crazy
    anim.run(ctx.player, 1460);
	});
	scriptManager.bind(EventType.OPHELD4, 4566, function (ctx) {//Rubber chicken dance
    anim.run(ctx.player, 1835);
	});
	
	
	scriptManager.bind(EventType.OPWORN1, 20084, function (ctx) {//Golden hammer
    anim.run(ctx.player, 15150);
	});
	scriptManager.bind(EventType.OPWORN1, 20077, function (ctx) {//Salty claws hat
    anim.run(ctx.player, 329);
	});
	scriptManager.bind(EventType.OPWORN1, 15426, function (ctx) {//Candy cane
    anim.run(ctx.player, 12664);
	});
	scriptManager.bind(EventType.OPWORN1, 14742, function (ctx) {//Lily of the valley
    anim.run(ctx.player, 11622);
	});
	scriptManager.bind(EventType.OPWORN1, 12645, function (ctx) {//Chocatrice cape
    anim.run(ctx.player, 8903);
	api.setSpotAnim(ctx.player, 1, 1566);
	});
	scriptManager.bind(EventType.OPWORN1, 10507, function (ctx) {//Reindeer hat prance
    anim.run(ctx.player, 5059);
	api.setSpotAnim(ctx.player, 1, 263);
	});
	
	
	scriptManager.bind(EventType.OPWORN2, 20084, function (ctx) {//Golden hammer
    anim.run(ctx.player, 15149);
	api.setSpotAnim(ctx.player, 1, 2953);
	});
	scriptManager.bind(EventType.OPWORN2, 15673, function (ctx) {//Squirrel Ears juggle
    anim.run(ctx.player, 12265);
	api.setSpotAnim(ctx.player, 1, 2145);
	});
	
	}

})();