/**
 *  @author Alex
 */

var LunarAltarListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, locTypeId, args) {
		var player = args.player;
		var location = args.location;
		if (event == EventType.OPLOC2) {
			LunarAltar.changespellbook(player, location);
				  
		}
	}
});

var listen = function(scriptManager) {
	var listener = new LunarAltarListener();
	scriptManager.registerListener(EventType.OPLOC2, 17010, listener);
};

var LunarAltar = {
		
	changespellbook : function (player, location) {
			multi2(player, "CHOOSE AN OPTION", "Lunar spellbook", function () {		
				api.setVarBit(player, 0, 2);
			}, "Normal spellbook", function () {
				api.setVarBit(player, 0, 0);
			});
			return;
	}
}