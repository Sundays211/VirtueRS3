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
var chat = require('../../chat');
var inv = require('../../inv');
var dialog = require('../dialog');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
	 scriptManager.bind(EventType.OPLOC1, 24842, function (ctx) {//Manhole (Quest Witch's House)
		chat.sendMessage(ctx.player, "The cover won't budge. It seems to be locked.");
	 });
	 scriptManager.bind(EventType.OPLOC1, 2867, function (ctx) {//Potted plant (Quest Witch's House)
		if (inv.has(ctx.player, 2409)) {
		chat.sendMessage(ctx.player, "You don't find anything interesting."); 
		} else{
		inv.give(ctx.player, 2409, 1);
		dialog.mesbox(ctx.player, "You find a key hidden under the flower pot."); 	 
		}	 
	 });
	 scriptManager.bind(EventType.OPLOC1, 2861, function (ctx) {//Door (Quest Witch's House)
        if (inv.has(ctx.player, 2409)) {
		dialog.chatplayer(ctx.player, "It would be rude to break into this house.", Expression.NEUTRAL)	
		} else{
		chat.sendMessage(ctx.player, "This door is locked."); 	 
		}		
	 });	
	}

})();
