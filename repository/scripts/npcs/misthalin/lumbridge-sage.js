/**
 * Copyright (c) 2016 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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
var map = require('map');
var coords = require('map/coords');
var util = require('util');
module.exports = (function () {
	return {
	init : init
	};
	
	function init (scriptManager) {
	scriptManager.bind(EventType.OPNPC1, 2244, function (ctx) {
	var player = ctx.player;
	var npc = ctx.npc;
	dialog.chatnpc(player, npc, "Greetings, adventurer. How may i help you?")
	.then(function () {
	if (util.isAdmin(player)) {
	dialog.multi4(player, "CHOOSE AN OPTION", "Who are you?", function () {
	iamphileas(player, npc);
	}, "Tell me about the town of Lumbridge.", function () {
	townofLumbridge(player, npc);	
	}, "I'm fine for now, thanks.", function () {	
	}, "I would like to access the P-Mod room.", function () {
	map.setCoords(player, coords(2845, 5158, 0));
	});
	} else 
	dialog.multi3(player, "CHOOSE AN OPTION", "Who are you?", function () {
	iamphileas(player, npc);
	}, "Tell me about the town of Lumbridge.", function () {
	townofLumbridge(player, npc);	
	}, "I'm fine for now, thanks.", function () {	
	});
	});	
	});
	}
	
	function iamphileas (player, npc) {
	dialog.builder(player).chatnpc(npc, "I am Phileas, the Lumbridge Sage. In times past, people<br>came from all around to ask me for advice. My renown<br>seems to have diminished somewhat in recent years,<br>though. Can i help you with anything?")	
    .multi2("CHOOSE AN OPTION", "Tell me about the town of lumbridge.", function () {	
	townofLumbridge(player, npc);	
	}, "I'm fine for now, thanks.", function () {	
	});	
	}
	
    function townofLumbridge (player, npc) {
	dialog.builder(player).chatnpc(npc, "Lumbridge is one of the older towns in the human-<br>controlled kingdoms. It was founded over two hundred<br> years ago towards the end of the Fourth Age. It's called<br> Lumbridge because of this bridge built over the River Lum.")
	.chatnpc(npc, "The town is governed by Duke Horacio, who is a good<br> friend of our monarch, King Roald of Misthalin.")
	.chatnpc(npc, "Recently, however,there have been great changes due to<br> the Battle of Lumbridge")
	.multi3("CHOOSE AN OPTION", "Who are you?", function () {
	iamphileas(player, npc);
    }, "What about the battle?", function () {
	dialog.builder(player).chatnpc(npc, "Indeed, not long ago there was a great fight between<br> Saradomin and Zamorak on the battlefield to the west of<br> the castle.")
	.chatnpc(npc, "Titanic forces were unleasheded as neither side could gain<br> the upper hand. Each side sought advantages, but it was<br> close until the end.")
	.chatnpc(npc, "The battle lasted for months, but in the end the forces of<be> the holy Saradomin where triumphant. Zamorak was<br> defeated... but...")
	.chatnpc(npc, "befor Saradomin could complete his victory, Moia the<br> general of Zamorak's transported him away.")
	.chatnpc(npc, "Now, the battlefield lies empty save for a single<br> Saradominist devotee.")
	.multi2("SELECT AN OPTION", "Who are you?", function () {
	iamphileas(player, npc);	
	}, "Goodbye", function () {
	dialog.builder(player).chatnpc(npc, "Good adventuring, traveller.")
    .finish();
	});
	}, "Goodbye!");
	}
	
})();
