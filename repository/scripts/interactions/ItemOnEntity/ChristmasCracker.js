/**
 * Copyright (c) 2014 Virtue Studios
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
var ForceTalkBlock = Java.type('org.virtue.model.entity.update.block.ForceTalkBlock');
var FaceEntityBlock = Java.type('org.virtue.model.entity.update.block.FaceEntityBlock');

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 01/16/2015
 */
var api;

var ItemOnEntityListener = Java.extend(Java.type('org.virtue.script.listeners.ItemOnEntityListener'), {

	/* The item ids to bind to */
	getIDs: function() {
		return [962];
	},

	/* The first option on an npc */
	//Target = used on
	//isNpc = true if the target is an npc, false if it's a player
	//item = The item used
	//slot = The backpack slot of the item
	handle: function(player, target, isNpc, item, slot) {
		var possibles = [1046, 1042, 1044, 1048, 1040, 1038];
		var extraPossibles = [1127, 1079, 1201, 1163, 2581, 6571, 563, 554, 555, 995, 1973, 1635, 950, 1897, 1969, 1217];
		var idx = Math.floor(Math.random()*possibles.length);
		var idx2 = Math.floor(Math.random()*extraPossibles.length);
		var choice = possibles[idx];
		var choice2 = extraPossibles[idx2];
		if (api.freeSpaceTotal(player, "backpack") < 3) {
			api.sendMessage(player, "Not enough space in your inventory.");
			return;
		}
		if (api.freeSpaceTotal(target, "backpack") < 3) {
			api.sendMessage(player, "The person you are trying to use this item on does not have enough inventory space.");
			return;
		}
		api.sendMessage(player, "You pulled the Christmas Cracker... ");
		player.queueUpdateBlock(new AnimationBlock(15153));
		player.queueUpdateBlock(new FaceEntityBlock(target));
		target.queueUpdateBlock(new AnimationBlock(15153));
		target.queueUpdateBlock(new FaceEntityBlock(player));
		if (Math.random() <= 0.5) {
			player.queueUpdateBlock(new FaceEntityBlock(null));
			player.queueUpdateBlock(new ForceTalkBlock("Hey! I got the cracker!"));
			api.addCarriedItem(player, choice2, 1); //Extra reward random
			api.addCarriedItem(player, choice, 1); //Random Partyhat
			api.addCarriedItem(player, 995, 100000); //Extra 100k for opening
			api.delCarriedItem(player, 962, 1, slot);
		} else {
			target.queueUpdateBlock(new FaceEntityBlock(null));
			target.queueUpdateBlock(new ForceTalkBlock("Hey! I got the cracker!"));
			api.addCarriedItem(target, choice2, 1); //Extra reward random
			api.addCarriedItem(target, choice, 1); //Random Partyhat
			api.addCarriedItem(target, 995, 100000); //Extra 100k for opening 
			api.delCarriedItem(player, 962, 1, slot);
		}
		return true;
	},
	
	getRange : function (player, isNpc, itemID) {
		return 1;
	}

});

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();	
	var listener = new ItemOnEntityListener();
	scriptManager.registerItemOnEntityListener(listener, listener.getIDs());
};