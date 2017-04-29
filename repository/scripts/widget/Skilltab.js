
var SkilltabListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		switch (args.component) {
		case 7:
			switch (args.slot) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 23:
			case 24:
			case 25:
			case 26:
				Overlay.openOverlay(player, 0);
				break;
			}
			break;
		
		default:
			api.sendMessage(player, "Unhandled skilltab button: comp="+args.component+", slot="+args.slot+", button="+args.button);
			return;
		}		
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new SkilltabListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1466, listener);
};