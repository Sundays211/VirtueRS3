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
var ContainerState = Java.type('org.virtue.model.entity.player.inv.ContainerState');
var GroundItem = Java.type('org.virtue.model.entity.region.GroundItem');
var Item = Java.type('org.virtue.model.entity.player.inv.Item');
var Tile = Java.type('org.virtue.model.entity.region.Tile');
var Util = Java.type('com.mysql.jdbc.Util');

/**
 * @author Kayla
 * @since 19/11/2014
 */
var api;

var PRAYER_SKILL = 5;

var Bury = {

		IMPIOUS_ASHES : {
			itemID : 20264,
			xp : 4*35
		},
		BONES : {
			itemID : 526,
			xp : 4.5*35
		},
		WOLF_BONES : {
			itemID : 2859,
			xp : 4.5*35
		},
		BURNT_BONES : {
			itemID : 528,
			xp : 4.5*35
		},
		MONKEY_BONES : {
			itemID : 3179,
			xp : 5*35
		},
		BAT_BONES : {
			itemID : 17672,
			xp : 5.3*35
		},
		ACCURSED_ASHES : {
			itemID : 20266,
			xp : 12.5*35
		},
		BIG_BONES : {
			itemID : 17674,
			xp : 12.5*35
		},
		JOGRE_BONES : {
			itemID : 3125,
			xp : 15*35
		},
		ZOGRE_BONES : {
			itemID : 4812,
			xp : 22.5*35
		},
		SHAIKAHAN_BONES : {
			itemID : 3123,
			xp : 22.5*35
		},
		BABYDRAGON_BONES : {
			itemID : 534,
			xp : 30*35
		},
		WYVERN_BONES : {
			itemID : 6812,
			xp : 50*35
		},
		INFERNAL_ASHES : {
			itemID : 20268,
			xp : 62.5*35
		},
		DRAGON_BONES : {
			itemID : 17676,
			xp : 72*35
		},
		FAYRG_BONES : {
			itemID : 4830,
			xp : 84*35
		},
		RAURG_BONES : {
			itemID : 4832,
			xp : 96*35
		},
		DAGANNOTH_BONES : {
			itemID : 6729,
			xp : 125*35
		},
		AIRUT_BONES : {
			itemID : 30209,
			xp : 132.5*35
		},
		OURG_BONES : {
			itemID : 4834,
			xp : 140*35
		},
		FROST_DRAGON_BONES : {
			itemID : 18830,
			xp : 180*35
		},
		ANCIENT_BONES : {
			itemID : 15410,
			xp : 200*35
		}
	};
	
var ItemListener = Java.extend(Java.type('org.virtue.script.listeners.ItemListener'), {

	/* The item ids to bind to */
	getItemIDs: function() {
		return [ 20264, 526, 2859, 528, 3179, 17672, 20266, 17674, 3125, 4812, 3123, 
		534, 6812, 20268, 17676, 4830, 4832, 6729, 30209, 4834, 18830, 15410 ];
	},

	/* The first option on an object */
	handleInteraction: function(player, item, slot, option) {
		switch (option) {
			case 1:
				buryBones(player, item, slot);
				break;
			default:
				api.sendMessage(player, "Unhandled bones action: objectid="+item.getID()+", option="+option);
				break;
		}
		return true;
	},
	
	/* Returns the examine text for the item, or "null" to use the default */
	getExamine : function (player, item) {
		return null;
	}

});

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var itemListener = new ItemListener();
	scriptManager.registerItemListener(itemListener, itemListener.getItemIDs());
}


function buryBones (player, item, slot) {
	if (api.isPaused(player)) {
		return false;//Cannot bury as an action is already in process
	}
	var bones = forBones(player, item);
	if(bones == null) {
		return true;
	}
	var delay = 3;
	api.pausePlayer(player, delay+1);
	api.sendFilterMessage(player, "You dig a hole in the ground...");
	api.runAnimation(player, 827);
	api.delCarriedItem(player, item.getID(), 1, slot);
	var Action = Java.extend(Java.type('org.virtue.model.entity.player.event.PlayerActionHandler'), {	
			process : function (player) {
				api.runAnimation(player, 827);
				if (delay <= 0) {
					forBuryingBones(player, item, slot);
					return true;
				}
				delay--;
				return false;
			},
			stop : function (player) {//Clear the current animation block
				api.clearAnimation(player);
			}
		
		});
		player.setAction(new Action());	
	}

	function forBuryingBones (player, item, slot) {
		var bones = forBones(player, item);
		api.sendFilterMessage(player, "You bury the " + api.getItemType(bones.itemID).name + ".");
		api.addExperience(player, "prayer", bones.xp, true);
	}

	function forBones(player, item) {
		var bones;
		for (ordial in Bury) {
			bones = Bury[ordial];
			if (bones.itemID == item.getID()) {
				return bones;
			}
		}
		return null;
	}

