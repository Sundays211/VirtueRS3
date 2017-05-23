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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Kayla <skype:ashbysmith1996>
 * @author Sundays211
 * @since 01/16/2015
 */

var ChristmasCrackerListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		var target = args.target;
		
		var possibles = [1046, 1042, 1044, 1048, 1040, 1038];
		var extraPossibles = [1127, 1079, 1201, 1163, 2581, 6571, 563, 554, 555, 995, 1973, 1635, 950, 1897, 1969, 1217];
		var idx = Math.floor(Math.random()*possibles.length);
		var idx2 = Math.floor(Math.random()*extraPossibles.length);
		var choice = possibles[idx];
		var choice2 = extraPossibles[idx2];
		if (api.freeSpaceTotal(player, Inv.BACKPACK) < 3) {
			api.sendMessage(player, "Not enough space in your inventory.");
			return;
		}
		if (api.freeSpaceTotal(target, Inv.BACKPACK) < 3) {
			api.sendMessage(player, "The person you are trying to use this item on does not have enough inventory space.");
			return;
		}
		api.sendMessage(player, "You pulled the Christmas Cracker... ");
		api.runAnimation(player, 15153);
		api.faceEntity(player, target);
		api.runAnimation(target, 15153);
		api.faceEntity(target, player);
		if (Math.random() <= 0.5) {
			api.clearFaceEntity(player);
			api.playerForceSay(player, "Hey! I got the cracker!", true);
			api.addCarriedItem(player, choice2, 1); //Extra reward random
			api.addCarriedItem(player, choice, 1); //Random Partyhat
			api.addCarriedItem(player, 995, 100000); //Extra 100k for opening
			api.delCarriedItem(player, 962, 1, args.slot);
		} else {
			api.clearFaceEntity(target);
			api.playerForceSay(target, "Hey! I got the cracker!", true);
			api.addCarriedItem(target, choice2, 1); //Extra reward random
			api.addCarriedItem(target, choice, 1); //Random Partyhat
			api.addCarriedItem(target, 995, 100000); //Extra 100k for opening 
			api.delCarriedItem(player, 962, 1, args.slot);
		}
	}
});

/* Listen to the npc ids specified */
var listen = function(scriptManager) {
	var listener = new ChristmasCrackerListener();
	scriptManager.registerListener(EventType.OPPLAYERU, 962, listener);
};