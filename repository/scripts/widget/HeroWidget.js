/** 
 * @author Kayla <skype:ashbysmith1996>
 * @since 02/21/2015
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The interfaces to bind to */
	getIDs: function() {
		return [ 1560, 1446 ];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {
		switch (interfaceID) {
		case 1560:
			api.openWidget(player, 1560, 16, 1558, true);//
			api.openWidget(player, 1560, 18, 1557, true);//Skills
			api.openWidget(player, 1560, 17, 1559, true);//Combat stats
			break;
		case 1446:
			api.setWidgetText(player, 1446, 94, api.getName(player));
			api.setWidgetText(player, 1446, 93, player.getAppearance().getPrefixTitle());
			break;
		}
	},
	

	/* Pressed a button on the interface */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch(interfaceID) {
		case 1560:
			switch (component) {
			case 22:
				api.closeOverlaySub(player, 1024, true);
				return true;
			}
			break;
		case 1446:
			switch(component) {
			case 108:
				api.openCentralWidget(player, 1561, false);
				return true;
			}
			break;
		}

	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}

});

/* Listen to the interface ids specified */
var listen = function(scriptLoader) {
	api = scriptLoader.getApi();
	var widgetListener = new WidgetListener();
	scriptLoader.registerWidgetListener(widgetListener, widgetListener.getIDs());
};
