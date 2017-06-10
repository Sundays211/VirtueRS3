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
var util = require('../core/util');
var map = require('../map');
var inv = require('../../inv');
var coords = require('../../map/coords');
var config = require('../../core/config');

module.exports = (function () {
		
	var PotionTypes = {
 	   OVERLOAD_FLASK : {
			itemID : 23531,
			buffAttack: 16,
			buffStrength: 16,
			buffRanged: 16,
			buffMagic: 16,
	        delayTime : 1,
	        potionText : null
	    }	    		    		    	   
};

   return {
		init : init
	};


	function init (scriptManager) {
	var ids = [];
	for (var i in PotionTypes) {
	ids.push(PotionTypes[i].itemID);
	}
    for (var i in ids) {
	scriptManager.bind(EventType.OPHELD1, ids[i], function (ctx) {
	var potion = forPotion(ctx.player, ctx.item);
	if (potion == null) {
		return;
	}
	var delay = 2;
	ENGINE.freezeEntity(ctx.player, delay+1);
	if (potion.healText != null) {
		chat.sendMessage(ctx.player, potion.healText);		
	} else {
		chat.sendMessage(ctx.player, "You drink the " + config.objName(potion.itemID) + ".");
	}
	if(ctx.player.getImpactHandler().inCombat() == true) {
		anim.run(ctx.player, 18002);
	} else {
		anim.run(ctx.player, 18001);
	}
	//To get the current level, use api.getStatLevel(player, stat)
	//To set the current level, use api.setStatLevel(player, stat, level)
	api.boostStat(ctx.player, Stat.STRENGTH, potion.buffStrength);
	api.boostStat(ctx.player, Stat.ATTACK, potion.buffAttack);
	api.boostStat(ctx.player, Stat.MAGIC, potion.buffMagic);
	api.boostStat(ctx.player, Stat.RANGED, potion.buffRanged);
	inv.take(ctx.player, potion.itemID, 1);
	});	 
	}
	}
	
	function getDelay (player, PotionTypes) {
	var timer = 1;
    print(timer+"\n");
	if (timer < 1 + PotionTypes.delayTime) {
		timer = 1 + Math.floor((Math.random() * PotionTypes.delayTime));
		print(timer+"\n");
	}
	return timer;
    }
   
	function forPotion(player, item) {
	var potion;
	for (ordial in PotionTypes) {
		potion = PotionTypes[ordial];
		if (potion.itemID == item.getID()) {
			return potion;
		}
	}
	return null;
} 


	
})();