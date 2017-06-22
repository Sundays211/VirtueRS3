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
/* globals EventType */
var dialog = require('dialog');
var anim = require('anim');
var inv = require('inv');
var map = require('map');
var coords = require('map/coords');
var widget = require('widget');

module.exports = (function () {
	return {
		init : init
	};
	
	function init (scriptManager) {
		scriptManager.bind(EventType.OPLOC1, [10673,10674,10675], function (ctx) {//Paintcans
			widget.openCentral(ctx.player, 383, false); 
		});	 
		
		scriptManager.bind(EventType.OPLOC1, 10687, function (ctx) {//puppet torsos blue
			//if varbit or varp 
			//dialog.chatplayer(ctx.player, "NEUTRAL", "I should speak to Rosie befor I touch these.", function () {
			//});
			//else
			anim.run(ctx.player, 832, function () {	
				inv.give(ctx.player, 6875, 1);
			});
			dialog.objbox(ctx.player, 6875, "You take a blue marionette torso from the box.");
		});
	
		scriptManager.bind(EventType.OPLOC1, 10699, function (ctx) {//Trapdoor steps
			dialog.mesbox(ctx.player,"If you leave Diango's workshop, any marionette parts, bits of bauble or<br> boxes will be removed from your inventory.")
				.multi2("LEAVE DIANGO'S WORKSHOP?", "Yes", function () {
					anim.run(ctx.player, 828, function () {	
						map.setCoords(ctx.player, coords(2007, 4427, 1));	
					});
				}, "No", function () {	
				
				});	
		});
	}
})();