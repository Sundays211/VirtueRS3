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
 * @author Kayla
 * @since 19/11/2014
 */

var Bury = {
		IMPIOUS_ASHES : {
			itemID : 20264,
			xp : 4
		},
		BONES : {
			itemID : 526,
			xp : 4.5
		},
		WOLF_BONES : {
			itemID : 2859,
			xp : 4.5
		},
		BURNT_BONES : {
			itemID : 528,
			xp : 4.5
		},
		MONKEY_BONES : {
			itemID : 3179,
			xp : 5
		},
		BAT_BONES : {
			itemID : 17672,
			xp : 5.3
		},
		ACCURSED_ASHES : {
			itemID : 20266,
			xp : 12.5
		},
		BIG_BONES : {
			itemID : 17674,
			xp : 12.5
		},
		JOGRE_BONES : {
			itemID : 3125,
			xp : 15
		},
		ZOGRE_BONES : {
			itemID : 4812,
			xp : 22.5
		},
		SHAIKAHAN_BONES : {
			itemID : 3123,
			xp : 22.5
		},
		BABYDRAGON_BONES : {
			itemID : 534,
			xp : 30
		},
		WYVERN_BONES : {
			itemID : 6812,
			xp : 50
		},
		INFERNAL_ASHES : {
			itemID : 20268,
			xp : 62.5
		},
		DRAGON_BONES : {
			itemID : 17676,
			xp : 72
		},
		FAYRG_BONES : {
			itemID : 4830,
			xp : 84
		},
		RAURG_BONES : {
			itemID : 4832,
			xp : 96
		},
		DAGANNOTH_BONES : {
			itemID : 6729,
			xp : 125
		},
		AIRUT_BONES : {
			itemID : 30209,
			xp : 132.5
		},
		OURG_BONES : {
			itemID : 4834,
			xp : 140
		},
		FROST_DRAGON_BONES : {
			itemID : 18830,
			xp : 180
		},
		ANCIENT_BONES : {
			itemID : 15410,
			xp : 200
		}
	};
	
var PrayerListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		buryBones(args.player, objTypeId, args.slot);
	}
});

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	var ids = [];
	for (var i in Bury) {
		ids.push(Bury[i].itemID);
	}
	var listener = new PrayerListener();
	for (var i in ids) {
		//Bind option one on all bones/ashes to this listener
		scriptManager.registerListener(EventType.OPHELD1, ids[i], listener);
	}	
}

var Prayer = {
		buryBones : function (player, objTypeId, slot) {
			if (api.isPaused(player)) {
				return false;//Cannot bury as an action is already in process
			}
			var bones = this.forBones(player, objTypeId);
			if(bones == null) {
				return true;
			}
			var delay = 3;
			api.pausePlayer(player, delay+1);
			api.sendMessage(player, "You dig a hole in the ground...", MesType.GAME_SPAM);
			api.runAnimation(player, 827);
			api.delCarriedItem(player, objTypeId, 1, slot);
			var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
				process : function (player) {
					api.runAnimation(player, 827);
					if (delay <= 0) {
						Prayer.burySuccess(player, bones);
						return true;
					}
					delay--;
					return false;
				},
				stop : function (player) {//Clear the current animation block
					api.stopAnimation(player);
				}
			
			});
			player.setAction(new Action());	
		},
		forBones : function (player, itemId) {
			var bones;
			for (var ordial in Bury) {
				bones = Bury[ordial];
				if (bones.itemID == itemId) {
					return bones;
				}
			}
			return null;
		},
		burySuccess : function (player, bones) {
			api.sendMessage(player, "You bury the " + api.getItemName(bones.itemID) + ".", MesType.GAME_SPAM);
			api.addExperience(player, Stat.PRAYER, bones.xp, true);
		}
}
