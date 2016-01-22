/** 
 * @author Kayla <skype:ashbysmith1996>
 * @since 02/21/2015
 */

var HeroOpenListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		switch (args["interface"]) {
		case 1446:
			api.setWidgetText(player, 1446, 94, api.getName(player));
			api.setWidgetText(player, 1446, 93, player.getAppearance().getPrefixTitle());
			return;
		case 1560:
			api.openWidget(player, 1560, 16, 1558, true);//
			api.openWidget(player, 1560, 18, 1557, true);//Skills
			api.openWidget(player, 1560, 17, 1559, true);//Combat stats
			return;
		}
	}
});

var HeroButtonListener = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, binding, args) {
		var player = args.player;
		switch (args["interface"]) {
		case 1446:
			if (args.component == 108) {
				api.openCentralWidget(player, 1561, false);
			} else {
				api.sendMessage(player, "Unhandled hero overlay button: interface="+args["interface"]+", comp="+args.component+", button="+args.button);
			}
			return;
		case 1560:
			if (args.component == 22) {
				api.closeOverlaySub(player, 1024, true);
			} else {
				api.sendMessage(player, "Unhandled hero overlay button: interface="+args["interface"]+", comp="+args.component+", button="+args.button);
			}
			return;
		}
	}
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new HeroOpenListener();
	scriptManager.registerListener(EventType.IF_OPEN, 1446, listener);
	scriptManager.registerListener(EventType.IF_OPEN, 1560, listener);
	
	listener = new HeroButtonListener();
	scriptManager.registerListener(EventType.IF_BUTTON, 1446, listener);
	scriptManager.registerListener(EventType.IF_BUTTON, 1560, listener);
};
