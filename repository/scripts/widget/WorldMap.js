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

var WorldMapOpen = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		
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
		api.setVarc(player, 622, api.getCoordHash(api.getCoords(player)));
		api.setWidgetEvents(player, 1422, 86, 0, 19, 2);
		api.hideWidget(player, 1422, 49, true);
		api.setVarc(player, 4197, -1);
		api.setVarc(player, 674, api.getCoordHash(api.getCoords(player)));
		player.setAction(new WorldMapOpenAction());
	}
});

var WorldMapClose = Java.extend(Java.type('org.virtue.engine.script.listeners.EventListener'), {
	invoke : function (event, trigger, args) {
		var player = args.player;
		
		api.runClientScript(player, 8105, []);
		api.setVarc(player, 622, -1);
		api.setVarc(player, 674, -1);
		api.openOverlaySub(player, 1015, 1215, true);
		api.openWidget(player, 1477, 15, 1482, true);
		player.clearAction();
	}
});

var WorldMapOpenAction = Java.extend(Java.type('org.virtue.game.entity.player.event.PlayerActionHandler'), {	
	process : function (player) {
		api.runAnimation(player, 22748);
		api.setVarc(player, 4197, -1);
		return false;
	},
	stop : function (player) {
		api.stopAnimation(player);
	}
	
});

/* Listen to the interface ids specified */
var listen = function(scriptManager) {
	var listener = new WorldMapOpen();
	scriptManager.registerListener(EventType.IF_OPEN, 1422, listener);
	
	listener = new WorldMapClose();
	scriptManager.registerListener(EventType.IF_CLOSE, 1422, listener);
};