/**
 * @Author Kayla
 */

var usingRing;


var ItemListener = Java.extend(Java.type('org.virtue.script.listeners.ItemListener'), {

	/* The item ids to bind to */
	getItemIDs : function() {
		return [ 7927 ];
	},

	/* The first option on an object */
	handleInteraction : function(player, item, slot, option) {
		switch (item.getId()) {
		case 7927:
			switch (option) {
			case 2:
				renderEasterRing(player);
				return true;
			}
			return true;
		default:
			return false;
		}
	},

	getExamine : function(player, item) {
		return null;
	}
	
});

function renderEasterRing(player) {
	var eggType = [3689, 3690, 3691, 3692, 3693, 3694];
	var idx = Math.floor(Math.random()*eggType.length);
	var eggPick = eggType[idx];
	if(usingRing) {
		usingRing = false;
		player.unlock();
		player.getAppearance().setRender(Render.PLAYER);
		player.getAppearance().refresh();
		//api.sendMessage(player, "Not using");
	} else {
		usingRing = true;
		player.lock();
		player.getAppearance().setRender(Render.NPC);
		player.getAppearance().setNPCId(eggPick);
		player.getAppearance().refresh();
		api.sendMessage(player, "You morphed into an magical egg! Re-click the ring to morph back.");
	}
}