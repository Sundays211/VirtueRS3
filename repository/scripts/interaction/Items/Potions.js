/**
 * @author Kayla
 */
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
 
var ItemListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;
		var item = args.item;
		var slot = args.slot;
		
		startPotion(player, item, slot);
	}
});

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	var ids = [ 23531 ];
	var itemListener = new ItemListener();
	for (var i in ids) {
		scriptManager.registerListener(EventType.OPHELD1, ids[i], itemListener);
	}
}

function startPotion (player, item, slot) {
	if (api.isPaused(player)) {
		return false;
	}
	var potion = forPotion(player, item);
	if (potion == null) {
		return;
	}
	var delay = 2;
	api.pausePlayer(player, delay+1);
	if (potion.potionText != null) {
		api.sendFilterMessage(player, potion.potionText);		
	} else {
		api.sendFilterMessage(player, "You drink the " + api.getItemType(potion.itemID).name + ".");
	}
	if(player.getCombat().inCombat() == true) {
		api.runAnimation(player, 18002);
	} else {
		api.runAnimation(player, 18001);
	}
	//To get the current level, use api.getStatLevel(player, stat)
	//To set the current level, use api.setStatLevel(player, stat, level)
	api.boostStat(player, Stat.STRENGTH, 16);
	api.boostStat(player, Stat.ATTACK, 16);
	api.boostStat(player, Stat.MAGIC, 16);
	api.boostStat(player, Stat.RANGED, 16);
	api.delCarriedItem(player, item.getID(), 1, slot);
	var Action = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
			process : function (player) {
				if (delay <= 0) {
					api.sendFilterMessage(player, "It heals some health.");
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
}

//Get Food Delay to stop all actions until animation is over, then re-continue the action
function getDelay (player, types) {
	var timer = 1;
	print(timer+"\n");
	if (timer < 1 + types.delayTime) {
		timer = 1 + Math.floor((Math.random() * types.delayTime));
		print(timer+"\n");
	}
	return timer;
}

//Call correct food name
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