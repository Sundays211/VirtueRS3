/**
 * Handles JMod ToolBox Widget
 * @Author Kayla
 * @Since 3/29/2016
 */

var JModOpenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		
	}
});

var JModButtonListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		switch(args.component) {
		case 82://Heal
			api.restoreLifePoints(player);
			return;
		case 115:
			//todo close
			return;
		case 185://Jmod Quick-Chat Option
			return;
		default:
			api.sendMessage(player, "Unhandled JMOD Toolbox overlay button: comp="+args.component+", button="+args.button);
			return;
		}
		return;
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new JModOpenListener();
	scriptManager.registerListener(EventType.IF_OPEN, 1610, listener);
	
	listener = new JModButtonListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1610, listener);
};