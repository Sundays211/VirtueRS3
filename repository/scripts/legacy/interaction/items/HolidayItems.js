/**
 * @Author Kayla
 */

var usingRing;



var ItemListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, objTypeId, args) {
		var player = args.player;
		var item = args.item;
		var slot = args.slot;

		if(event == EventType.OPHELD1) {
		switch (objTypeId) {
				
	    case 6865://marionette blue jump
		api.runAnimation(player, 3003);
		api.setSpotAnim(player, 1, 511);
		return;	
		case 6866://marionette green jump
		api.runAnimation(player, 3003);
		api.setSpotAnim(player, 1, 515);
		return;
		case 6867://marionette red jump
		api.runAnimation(player, 3003);
		api.setSpotAnim(player, 1, 507);
		return;
		case 4079://Yo-yo play
		api.runAnimation(player, 1457);
		return;	
		case 6722://Zombie head talk at
		api.playerForceSay(player, "Alas!", false);
		api.runAnimation(player, 2840);
		return;	
		}
		} else if (event == EventType.OPHELD2) {
		switch (objTypeId) {

		//	case 4565:
			
		//	skipping anim 1836 aand i think stand is 1837
		//	return;
		case 6865://marionette blue walk
		api.runAnimation(player, 3004);
		api.setSpotAnim(player, 1, 512);
		return;	
		case 6866://marionette green walk
		api.runAnimation(player, 3004);
		api.setSpotAnim(player, 1, 516);
		return;
		case 6867://marionette red walk
		api.runAnimation(player, 3004);
		api.setSpotAnim(player, 1, 508);
		return;	
		case 4079://Yo-yo loop
		api.runAnimation(player, 1458);
		return;	
        case 7927://EasterRing
		renderEasterRing(player);
		return;
		case 6722://Zombie head Display
		api.playerForceSay(player, "Mwuhahahaha!", false);
		api.runAnimation(player, 2844);
		return;	
		}
		} else if (event == EventType.OPHELD3) {
		switch (objTypeId) {
		case 6865://marionette blue bow
		api.runAnimation(player, 3005);
		api.setSpotAnim(player, 1, 513);
		return;	
		case 6866://marionette green bow
		api.runAnimation(player, 3005);
		api.setSpotAnim(player, 1, 517);
		return;
		case 6867://marionette red bow
		api.runAnimation(player, 3005);
		api.setSpotAnim(player, 1, 509);
		return;		
		case 4079://Yo-yo loop
		api.runAnimation(player, 1459);
		return;	
        case 15353://eek play with
		api.runAnimation(player, 12490);
        api.setSpotAnim(player, 1, 2178);
		return;	
		}
		} else if (event == EventType.OPHELD4) {
        switch (objTypeId) {
		case 6865://marionette blue dance
		api.runAnimation(player, 3006);
		api.setSpotAnim(player, 1, 514);
		return;	
		case 6866://marionette green dance
		api.runAnimation(player, 3006);
		api.setSpotAnim(player, 1, 518);
		return;
		case 6867://marionette red dance
		api.runAnimation(player, 3006);
		api.setSpotAnim(player, 1, 510);
		return;	
		case 4079://Yo-yo crazy
		api.runAnimation(player, 1460);
		return;	
		case 4566://Rubber chicken dance
		api.runAnimation(player, 1835);
		return;
	    }
		} else if (event == EventType.OPWORN1) {
		switch (objTypeId) {
			case 12645://Chocatrice cape
		api.runAnimation(player, 8903);
        api.setSpotAnim(player, 1, 1566);
		return;	
        case 15673://Squirrel Ears Summon Minion	
		return;	
		case 10507:// Reindeer hat prance   
		api.runAnimation(player, 5059);
       // api.setSpotAnim(player, 1, 263);
		return;
		}
		} else if (event == EventType.OPWORN2) {
		switch (objTypeId) {
        case 15673://Squirrel Ears juggle
		api.runAnimation(player, 12265);
        api.setSpotAnim(player, 1, 2145);
		return;	
		}

	  }
	}
});





/* Listen to the item ids specified */
var listen = function(scriptManager) {
	var ids = [ 7927,6722,4566,15353,4079,6865,6866,6867 ];
	var itemListener = new ItemListener();
	for (var i in ids) {
		scriptManager.registerListener(EventType.OPHELD1, ids[i], itemListener);
		scriptManager.registerListener(EventType.OPHELD2, ids[i], itemListener);
		scriptManager.registerListener(EventType.OPHELD3, ids[i], itemListener);
		scriptManager.registerListener(EventType.OPHELD4, ids[i], itemListener);
	}
	var wornids = [ 15673,10507,12645 ];
	for (var i in wornids) {
		scriptManager.registerListener(EventType.OPWORN1, wornids[i], itemListener);
		scriptManager.registerListener(EventType.OPWORN2, wornids[i], itemListener);
	}
	
	
	
	
	
}

function renderEasterRing(player) {
	var eggType = [3689, 3690, 3691, 3692, 3693, 3694];
	var idx = Math.floor(Math.random()*eggType.length);
	var eggPick = eggType[idx];
	if(usingRing) {
		usingRing = false;
	//	player.unlock();
		player.getAppearance().setRender(Render.PLAYER);
		player.getAppearance().refresh();
		//api.sendMessage(player, "Not using");
	} else {
		usingRing = true;
		//player.lock();
		player.getAppearance().setRender(Render.NPC);
		player.getAppearance().setNPCId(eggPick);
		player.getAppearance().refresh();
		api.sendMessage(player, "You morphed into an magical egg! Re-click the ring to morph back.");
	}
}
