/**
 * @Author Kayla
 */

var usingRing;

var ItemListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;
		var item = args.item;
		var slot = args.slot;
		
		renderEasterRing(player);
	}
});

/* Listen to the item ids specified */
var listen = function(scriptManager) {
	var ids = [ 7927 ];
	var itemListener = new ItemListener();
	for (var i in ids) {
		//Listen to option 2
		scriptManager.registerListener(EventType.OPHELD2, ids[i], itemListener);
	}
}

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