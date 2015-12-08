/**
 * Copyright (c) 2014 Virtue Studios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions\:
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

/**
 * @author Im Frizzy <skype:kfriz1998>
 * @author Frosty Teh Snowman <skype:travis.mccorkle>
 * @author Arthur <skype:arthur.behesnilian>
 * @author Sundays211
 * @since 9/11/2014
 */
var api;

var WidgetListener = Java.extend(Java.type('org.virtue.engine.script.listeners.WidgetListener'), {

	/* The interface ids to bind to */
	getIDs: function() {
		return [1422];
	},
	
	open : function (player, parentID, parentComponent, interfaceID) {		
		api.setWidgetEvents(player, 1422, 38, 2, 2, 2);
		api.setWidgetEvents(player, 1422, 39, 2, 2, 2);
		api.setWidgetEvents(player, 1422, 40, 2, 2, 2);
		api.setWidgetEvents(player, 1422, 41, 2, 2, 2);
		api.setWidgetEvents(player, 1422, 42, 2, 2, 2);
		api.setWidgetEvents(player, 1422, 43, 2, 2, 2);
		api.setWidgetEvents(player, 1422, 44, 2, 2, 2);
		api.setWidgetEvents(player, 1422, 45, 2, 2, 2);
		api.setWidgetEvents(player, 1422, 46, 2, 2, 2);
		api.setWidgetEvents(player, 1422, 47, 2, 2, 2);
		api.setVarc(player, 622, player.getCurrentTile().getTileHash());
		api.setWidgetEvents(player, 1422, 86, 0, 19, 2);
		api.hideWidget(player, 1422, 49, true);
		api.setVarc(player, 4197, -1);
		api.setVarc(player, 674, player.getCurrentTile().getTileHash());
		player.setAction(new WorldMapOpenAction());		
	},

	/* The first option on an object */
	handleInteraction: function(player, interfaceID, component, slot, itemID, option) {
		switch (component) {
		case 167://Close button
			return true;
		default:
			return false;
		}
	},
	
	close : function (player, parentID, parentComponent, interfaceID) {
		api.runClientScript(player, 8105, []);
		api.setVarc(player, 622, -1);
		api.setVarc(player, 674, -1);
		api.openOverlaySub(player, 1015, 1215, true);
		api.openWidget(player, 1477, 12, 1482, true);
		player.clearAction();
	},
	
	drag : function (player, interface1, component1, slot1, item1, interface2, component2, slot2, item2) {
		return false;
	}

});

var WorldMapOpenAction = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
	process : function (player) {
		api.runAnimation(player, 22748);
		api.setVarc(player, 4197, -1);
		return false;
	},
	stop : function (player) {
		api.runAnimation(player, 22749);
	}
	
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	api = scriptManager.getApi();
	var widgetListener = new WidgetListener();
	scriptManager.registerWidgetListener(widgetListener, widgetListener.getIDs());
};