/**
 * Copyright (c) 2014 Virtue Studios
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
/* globals EventType, ENGINE */
var chat = require('chat');
var anim = require('anim');
var map = require('map');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 24/01/2015
 */

module.exports = function (scriptManager) {
	scriptManager.bind(EventType.OPHELD1, 20709, function (ctx) {
		//Option 1 (Place) as an inventory item
		placeClanVex(ctx.player);
	});
	scriptManager.bind(EventType.OPWORN1, 20709, function (ctx) {
		//Option 1 (Place) as a worn item
		placeClanVex(ctx.player);
	});
	scriptManager.bind(EventType.OPNPC1, 13634, function (ctx) {
		//Option 1 (Read) as an NPC vexillum
		readClanVex(ctx.player);
	});
	scriptManager.bind(EventType.OPNPC3, 13634, function (ctx) {
		//Option 3 (Remove) as an NPC vexillum
		checkVexOwnership(ctx.player);
	});
	
	function placeClanVex (player) {
		var npc = ENGINE.createNpc(13634, map.getCoords(player));
		if(npc.getOwner() !== null) {
			chat.sendMessage(player, "You already have a clan vex out.");
		} else {
		   npc.setOwner(player);
		   ENGINE.spawnNpc(npc);
		   anim.run(player, 827);
		   ENGINE.moveAdjacent(player);
		}
	}

	function checkVexOwnership(player, npc) {
		if(!npc.isOwner(player)) {
			chat.sendMessage(player, "You are not the owner of this Clan Vex.");
			return true;
		}
		npc.destroy();
		player.setPet(null);
		
	}

	function readClanVex(player) {
		chat.sendMessage(player, "There's no information about this clan.");
	}
};

